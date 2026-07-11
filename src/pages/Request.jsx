import { useState } from 'react';
import Footer from '../components/Footer';
import Form from '../components/Form';
import Navbar from '../components/Navbar';
import { userRequest } from '../utils/RequestMethods';
import { toast } from 'react-toastify';
import { uploadFileToStorage } from '../utils/uploadFile';

const Request = () => {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    uploadFileToStorage({
      file,
      onProgress: (progress, state) => {
        console.log(`Upload is ${progress}% done`, state);
      },
      onError: () => {
        toast.error('Upload failed. Please try again.');
      },
      onSuccess: (downloadURL) => {
        const request = { ...inputs, img: downloadURL };
        userRequest.post('request', request);
        toast.success('Request sent successfully');
      },
    });
  };
  return (
    <>
      <Navbar />
      <div id="contact" className="max-w-[1140px] m-auto w-full min-h-[85vh] p-4 py-16">
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
