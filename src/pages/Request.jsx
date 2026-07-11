import { useState } from "react";
import Footer from "../components/Footer";
import Form from "../components/Form";
import Navbar from "../components/Navbar";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase/Firebase";
import { userRequest } from "../utils/RequestMethods";
import { toast } from "react-toastify";

const Request = () => {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  console.log(inputs, file);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const request = { ...inputs, img: downloadURL };
          console.log(request);
          userRequest.post("request", request);
          toast.success("Request sent successfully");
        });
      }
    );
  };
  return (
    <>
      <Navbar />
      <div
        id="contact"
        className="max-w-[1140px] m-auto w-full min-h-[85vh] p-4 py-16"
      >
        <h1 className="text-center text-gray-700 font-extrabold text-xl">
          Have a specific product in mind?
        </h1>
        <p className="text-center text-gray-700 py-2">Send us a message</p>
        <div className="grid md:grid-cols-2">
          <img
            src="https://media.istockphoto.com/id/1368585997/vector/flat-vector-illustration-of-group-of-people-shopping-isolated-on-white-background.jpg?b=1&s=612x612&w=0&k=20&c=yDb8YSf982e7Or-vnYtpYzcKSoez5JAXXiAWVC7Ea-0="
            alt="/"
            className="w-full md:h-full object-cover p-2 max-h-[500px] h-[200px]"
          />
          <Form
            setFile={setFile}
            inputs={inputs}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Request;
