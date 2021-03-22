const JWT = require('./theJWT');

console.log(__dirname);

let data2 = { "amail": "admin@123.com", "upwd": "123123" };
let data = { "uemail": "abc@123.com", "upwd": "123123" };
let test = new JWT();

let token = test.generateToken(data);
console.log(token);

// let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwidXNlciI6ImFiY0AxMjMuY29tIiwiaWF0IjoxNjE1OTg1NDc0LCJleHAiOjE2MTU5ODkwNzR9.e8uWaI-gD4w5nutkNsYJI9Xy3VCahslazHcbJUydo9VPYe24a35iiXXOWtb_MiXTDT-rC2T5eNnhbD1Fsr85PXRvhOlXoyE1jp47LGn6QDMVCl2-ysxRInUU7-pzTFVYJX1FRLFfEOAfzWrA0s1PfzcSkPjdMDUT8QV7gt9w116xP388Sbh2b2USHzplT8Uq9pdyGtAISQEGZO0JQb6b4NhNl5_mA3Gp73Dz_Xa86oCGD3DAlgJ4MJ7ZqY2_EwA4WIJLWfli-LTjSwNrPjcr4LkOSS03QDXiMRy2sQ7ncoqPpKUe4DijpplZ3yqj0b4qzS3uBs1kNfshPmsJQkcqXQ";
let ver_res = test.verifyToken(token);
console.log(ver_res);