import React, { useState } from "react";

const LEVELS = ["Beginner", "Intermediate", "Advanced"];

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    yearsOfExperience: "",
    skillsOffered: [],
    skillsToLearn: [],
  });

  const [skillInput, setSkillInput] = useState({
    skill: "",
    level: "Beginner",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addSkill = (type) => {
    if (!skillInput.skill) return;

    setForm({
      ...form,
      [type]: [...form[type], skillInput],
    });

    setSkillInput({ skill: "", level: "Beginner" });
  };

  const removeSkill = (type, index) => {
    const updated = [...form[type]];
    updated.splice(index, 1);
    setForm({ ...form, [type]: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Fields */}
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            name="yearsOfExperience"
            placeholder="Years of Experience"
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Skill Input */}
          <div className="bg-gray-50 p-3 rounded-lg space-y-2">
            <h3 className="font-semibold text-sm">Add Skill</h3>

            <div className="flex gap-2">
              <input
                placeholder="Skill (e.g. React)"
                value={skillInput.skill}
                onChange={(e) =>
                  setSkillInput({ ...skillInput, skill: e.target.value })
                }
                className="flex-1 border rounded-lg px-2 py-1"
              />

              <select
                value={skillInput.level}
                onChange={(e) =>
                  setSkillInput({ ...skillInput, level: e.target.value })
                }
                className="border rounded-lg px-2 py-1"
              >
                {LEVELS.map((lvl) => (
                  <option key={lvl}>{lvl}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => addSkill("skillsOffered")}
                className="flex-1 bg-green-500 text-white py-1 rounded-lg hover:bg-green-600"
              >
                + Offered
              </button>

              <button
                type="button"
                onClick={() => addSkill("skillsToLearn")}
                className="flex-1 bg-purple-500 text-white py-1 rounded-lg hover:bg-purple-600"
              >
                + Learn
              </button>
            </div>
          </div>

          {/* Skills Offered */}
          <div>
            <h4 className="font-semibold text-sm mb-1">Skills Offered</h4>
            <div className="flex flex-wrap gap-2">
              {form.skillsOffered.map((s, i) => (
                <span
                  key={i}
                  className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs flex items-center gap-1"
                >
                  {s.skill} ({s.level})
                  <button onClick={() => removeSkill("skillsOffered", i)}>
                    ❌
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Skills To Learn */}
          <div>
            <h4 className="font-semibold text-sm mb-1">Skills To Learn</h4>
            <div className="flex flex-wrap gap-2">
              {form.skillsToLearn.map((s, i) => (
                <span
                  key={i}
                  className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs flex items-center gap-1"
                >
                  {s.skill} ({s.level})
                  <button onClick={() => removeSkill("skillsToLearn", i)}>
                    ❌
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}