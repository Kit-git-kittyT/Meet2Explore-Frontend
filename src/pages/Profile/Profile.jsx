import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../services/userService";
import "./Profile.css";
import Swal from "sweetalert2";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    fullname: "",
    bio: "",
    gender: "other",
    avatar: "",
  });

  useEffect(() => {
    async function load() {
      try {
        const data = await getProfile();
        setUser(data);
        setForm({
          fullname: data.fullname || "",
          bio: data.bio || "",
          gender: data.gender || "other",
          avatar: data.avatar || "",
        });
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // ⭐ NEW FUNCTION: Upload avatar image from local file
  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/api/users/avatar", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      // Update avatar instantly
      setForm((prev) => ({ ...prev, avatar: data.avatar }));
      setUser((prev) => ({ ...prev, avatar: data.avatar }));

      Swal.fire("Avatar updated!", "", "success");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const updated = await updateProfile(form);
      setUser(updated);

      Swal.fire({
        title: "Saved!",
        text: "Your profile has been updated.",
        icon: "success",
        confirmButtonColor: "#4a90e2",
      });
    } catch (err) {
      Swal.fire("Error", "Could not update profile", "error");
    }
  }

  // Avatar logic stays the same
  const avatarSrc =
    form.avatar ||
    (form.gender === "female"
      ? "/avatars/female.png"
      : "/avatars/male.png");

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>My Profile</h2>

        {!user ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="profile-form">
            
            <div className="profile-header">
              <img src={avatarSrc} alt="avatar" className="profile-avatar" />
              <div>
                <h3>{form.fullname || user.username}</h3>
                <p className="profile-username">@{user.username}</p>
              </div>
            </div>

            {/* ⭐ NEW UI: Local upload instead of URL */}
            <label>Upload Avatar</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />

            <label>Full name</label>
            <input
              type="text"
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              placeholder="Your full name"
            />

            <label>Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Tell something about yourself..."
            />

            <label>Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>

            <button className="save-btn">Save Changes</button>
          </form>
        )}
      </div>
    </div>
  );
}
