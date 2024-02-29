
const ApplicationForm = () => {
    return (
        <form className="flex flex-col justify-center gap-y-4" onSubmit={handleSubmit}>
            <label className="text-xl">Full Name</label>
            <input className="text-xl" type="text" name="name" />
            <label className="text-xl">Parents full names</label>
            <input className="text-xl" type="text" name="parents" />
            <label className="text-xl">Email</label>
            <input className="text-xl" type="email" name="email" />
            <label className="text-xl">Graduation Year</label>
            <input className="text-xl" type="number" name="graduationYear" />
            <label className="text-xl">School you will be attending</label>
            <input className="text-xl" type="text" name="college" />
            <label className="text-xl">Major</label>
            <input className="text-xl" type="text" name="major" />
            <label className="text-xl">Bio</label>
            <textarea className="text-xl" name="bio" rows="5" />
            <button className="text-xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
        </form>
    );
    }

export default ApplicationForm;