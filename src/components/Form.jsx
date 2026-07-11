const Form = ({ inputs, handleChange, handleSubmit, setFile }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2">
        <input
          className="border m-2 p-2"
          name="firstName"
          placeholder="First Name"
          type="text"
          required
          value={inputs.firstName || ""}
          onChange={handleChange}
        />
        <input
          className="border m-2 p-2"
          name="lastName"
          type="text"
          required
          placeholder="Last Name"
          value={inputs.lastName || ""}
          onChange={handleChange}
        />
        <input
          className="border m-2 p-2"
          name="email"
          type="email"
          required
          placeholder="Email"
          value={inputs.email || ""}
          onChange={handleChange}
        />
        <input
          className="border m-2 p-2"
          name="phone"
          type="tel"
          required
          placeholder="Phone"
          value={inputs.phone || ""}
          onChange={handleChange}
        />
        <input
          className="border col-span-2 p-2 m-2"
          name="address"
          placeholder="Address"
          type="text"
          required
          value={inputs.address || ""}
          onChange={handleChange}
        />
        <input
          className="hidden"
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label
          htmlFor="file"
          className="border col-span-2 p-2 m-2 underline underline-offset-2 text-gray-400"
        >
          Upload Image of Requested Product
        </label>
        <button className="col-span-2 m-2">Submit</button>
      </div>
    </form>
  );
};

export default Form;
