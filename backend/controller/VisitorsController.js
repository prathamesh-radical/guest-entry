import db from "../db/db.js";
import bcrypt from "bcryptjs";

export const AddApartment = async (req, res) => {
    const { apartment_name } = req.body;

    if (!req?.query?.user_id || !apartment_name) {
        return res.status(400).json({ message: "All fields are required", success: false });
    }

    try {
        db.query(
            "SELECT * FROM apartment WHERE apartment_name = ? AND user_id = ?", [apartment_name, req?.query?.user_id], 
            (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Error checking existing user", success: false });
                }
                if (result.length > 0) {
                    return res.status(400).json({ message: "This apartment is already registered.", success: false });
                }
                db.query(
                    "INSERT INTO apartment (user_id, apartment_name) VALUES (?, ?)", [req?.query?.user_id,apartment_name],
                    (err, result) => {
                        if (err) {
                            return res.status(500).json({ message: "Error while registering the apartment.", success: false });
                        }
                        if (result.affectedRows > 0) {
                            return res.status(200).json({ message: "Apartment added successfully.", success: true });
                        } else {
                            return res.status(404).json({ message: "No record found with the provided id", success: false });
                        }
                    }
                );
            }
        );
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const AddFlat = async (req, res) => {
    const { first_name, last_name, phone_no, apartment_name, floor_no, flat_no } = req.body;

    if (!req?.query?.user_id || !first_name || !last_name || !phone_no || !apartment_name || !floor_no || !flat_no) {
        return res.status(400).json({ message: "All fields are required", success: false });
    }

    try {
        db.query(
            "SELECT * FROM flat WHERE apartment_name = ? AND floor_no = ? AND flat_no = ? AND user_id = ?", [apartment_name, floor_no, flat_no, req?.query?.user_id], 
            (err, result) => {
                if (err) {
                    console.log("err", err)
                    return res.status(500).json({ message: "Error checking existing user", success: false });
                }
                if (result.length > 0) {
                    return res.status(400).json({ message: "This flat is already registered for the entered floor no of selected apartment.", success: false });
                }
                db.query(
                    "INSERT INTO flat (user_id, first_name, last_name, phone_no, apartment_name, floor_no, flat_no) VALUES (?, ?, ?, ?, ?, ?, ?)", [req?.query?.user_id, first_name, last_name, phone_no, apartment_name, floor_no, flat_no],
                    (err, result) => {
                        if (err) {
                            return res.status(500).json({ message: "Error while registering the flat.", success: false });
                        }
                        if (result.affectedRows > 0) {
                            return res.status(200).json({ message: "Flat added successfully.", success: true });
                        } else {
                            return res.status(404).json({ message: "No record found with the provided id", success: false });
                        }
                    }
                );
            }
        );
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const AddVisitor = async (req, res) => {
    const { first_name, last_name, phone_no, address, vehicle_type, vehicle_no, apartment_name, floor_no, flat_no, person_to_meet } = req.body;

    if (!req?.query?.user_id || !first_name || !last_name || !apartment_name || !floor_no || !flat_no || !person_to_meet || (
        (vehicle_type === "bike" || vehicle_type === "car") && !vehicle_no)
    ) {
        return res.status(400).json({ message: "All fields are required", success: false });
    }

    try {
        db.query(
            "INSERT INTO visitor (user_id, first_name, last_name, phone_no, address, vehicle_type, vehicle_no, apartment_name, floor_no, flat_no, person_to_meet) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [req?.query?.user_id, first_name, last_name, phone_no, address, vehicle_type, vehicle_no, apartment_name, floor_no, flat_no, person_to_meet],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Error while registering the visitor.", success: false });
                }
                if (result.affectedRows > 0) {
                    return res.status(200).json({ message: "Visitor added successfully.", success: true });
                } else {
                    return res.status(404).json({ message: "No record found with the provided id", success: false });
                }
            }
        );
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const UpdateUserData = async (req, res) => {
    const { first_name, last_name, email, phone_no } = req.body;
    const { user_id } = req.query;

    if (!user_id) {
        return res.status(400).json({ message: "User ID is required", success: false });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format", success: false });
    }

    const phoneRegex = /^\d{7,15}$/; // basic phone number check (7-15 digits)
    if (phone_no && !phoneRegex.test(phone_no)) {
        return res.status(400).json({ message: "Invalid phone number format", success: false });
    }

    try {
        db.query("SELECT * FROM registration WHERE id = ?", [user_id], (err, currentResults) => {
            if (err) {
                console.error("Error fetching current user:", err);
                return res.status(500).json({ message: "Error fetching current user data", success: false });
            }

            if (currentResults.length === 0) {
                return res.status(404).json({ message: "No record found with the provided ID", success: false });
            }

            // Only check name uniqueness if both first and last name provided
            const checkNameAndProceed = () => {
                const checkEmailAndPhoneThenUpdate = () => {
                    const proceedToUpdate = () => {
                        let updateQuery = "UPDATE registration SET first_name = ?, last_name = ?";
                        const updateValues = [first_name, last_name];

                        if (email) {
                            updateQuery += ", email = ?";
                            updateValues.push(email);
                        }

                        if (phone_no) {
                            updateQuery += ", phone_no = ?";
                            updateValues.push(phone_no);
                        }

                        updateQuery += " WHERE id = ?";
                        updateValues.push(user_id);

                        db.query(updateQuery, updateValues, (err, result) => {
                            if (err) {
                                console.error("Error updating user data:", err);
                                return res.status(500).json({ message: "Error while updating user data", success: false });
                            }

                            if (result.affectedRows > 0) {
                                return res.status(200).json({ message: "User data updated successfully", success: true });
                            } else {
                                return res.status(404).json({ message: "No record found with the provided ID", success: false });
                            }
                        });
                    };

                    // If email provided, check uniqueness
                    if (email) {
                        db.query(
                            "SELECT * FROM registration WHERE email = ? AND id != ?",
                            [email, user_id],
                            (err, emailResults) => {
                                if (err) {
                                    console.error("Error checking existing email:", err);
                                    return res.status(500).json({ message: "Error checking existing email", success: false });
                                }

                                if (emailResults.length > 0) {
                                    return res.status(400).json({ message: "This email is already registered by another user", success: false });
                                }

                                // If phone provided, check uniqueness next
                                if (phone_no) {
                                    db.query(
                                        "SELECT * FROM registration WHERE phone_no = ? AND id != ?",
                                        [phone_no, user_id],
                                        (err, phoneResults) => {
                                            if (err) {
                                                console.error("Error checking existing phone:", err);
                                                return res.status(500).json({ message: "Error checking existing phone number", success: false });
                                            }

                                            if (phoneResults.length > 0) {
                                                return res.status(400).json({ message: "This phone number is already registered by another user", success: false });
                                            }

                                            proceedToUpdate();
                                        }
                                    );
                                } else {
                                    proceedToUpdate();
                                }
                            }
                        );
                    } else if (phone_no) {
                        // Only phone provided, check its uniqueness
                        db.query(
                            "SELECT * FROM registration WHERE phone_no = ? AND id != ?",
                            [phone_no, user_id],
                            (err, phoneResults) => {
                                if (err) {
                                    console.error("Error checking existing phone:", err);
                                    return res.status(500).json({ message: "Error checking existing phone number", success: false });
                                }

                                if (phoneResults.length > 0) {
                                    return res.status(400).json({ message: "This phone number is already registered by another user", success: false });
                                }

                                proceedToUpdate();
                            }
                        );
                    } else {
                        // Neither email nor phone provided
                        proceedToUpdate();
                    }
                };

                if (first_name && last_name) {
                    db.query(
                        "SELECT * FROM registration WHERE (first_name = ? AND last_name = ?) AND id != ?",
                        [first_name, last_name, user_id],
                        (err, nameResults) => {
                            if (err) {
                                console.error("Error checking existing name:", err);
                                return res.status(500).json({ message: "Error checking existing name", success: false });
                            }

                            if (nameResults.length > 0) {
                                return res.status(400).json({ message: "This name is already registered by another user", success: false });
                            }

                            checkEmailAndPhoneThenUpdate();
                        }
                    );
                } else {
                    // Skip name check if names not provided
                    checkEmailAndPhoneThenUpdate();
                }
            };

            checkNameAndProceed();
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const UpdateUserPassword = async (req, res) => {
    const { current_password, new_password, confirm_password } = req.body;
    const { user_id } = req.query;

    if (!user_id) {
        return res.status(400).json({ message: "User ID is required", success: false });
    }

    if (!current_password || !new_password || !confirm_password) {
        return res.status(400).json({ message: "All fields are required", success: false });
    }

    if (new_password !== confirm_password) {
        return res.status(400).json({ message: "New password and confirm password do not match", success: false });
    }

    try {
        db.query("SELECT * FROM registration WHERE id = ?", [user_id], (err, results) => {
            if (err) {
                console.error("Error fetching user:", err);
                return res.status(500).json({ message: "Error fetching user data", success: false });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: "No record found with the provided ID", success: false });
            }

            const user = results[0];

            const isPasswordValid = bcrypt.compareSync(current_password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: "Current password is incorrect", success: false });
            }

            const isNewSameAsCurrent = bcrypt.compareSync(new_password, user.password);
            if (isNewSameAsCurrent) {
                return res.status(400).json({ message: "New password must differ from current password.", success: false });
            }

            const hashedPassword = bcrypt.hashSync(new_password, 10);
            db.query("UPDATE registration SET password = ? WHERE id = ?", [hashedPassword, user_id], (err, result) => {
                if (err) {
                    console.error("Error updating password:", err);
                    return res.status(500).json({ message: "Error updating password", success: false });
                }

                return res.status(200).json({ message: "Password updated successfully", success: true });
            });
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};