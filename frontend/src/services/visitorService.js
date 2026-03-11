export const checkVisitor = async(image) => {

const formData = new FormData();

formData.append("photo",{
uri:image.uri,
type:"image/jpeg",
name:"visitor.jpg"
});

const response = await fetch("http:192.168.1.15:3000/api/check-visitor",{
method:"POST",
body:formData,
headers:{
"Content-Type":"multipart/form-data"
}
});

return response.json();

};