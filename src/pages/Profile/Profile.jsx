import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../services/userService";
import Swal from "sweetalert2";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    fullname: "",
    bio: "",
    gender: "other",
    avatar: "",
  });

  const [showAvatarPopup, setShowAvatarPopup] = useState(false);

  useEffect(() => {
    async function loadUser() {
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

    loadUser();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/api/users/avatar", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
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
      });
    } catch (err) {
      Swal.fire("Error", "Could not update profile", "error");
    }
  }

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
          <>
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="profile-header">
                {/* CLICKABLE AVATAR */}
                <img
                  src={avatarSrc}
                  alt="avatar"
                  className="profile-avatar"
                  onClick={() => setShowAvatarPopup(true)}
                />

                <div>
                  <h3>{form.fullname || user.username}</h3>
                  <p className="profile-username">@{user.username}</p>
                </div>
              </div>

              <label>Upload Avatar</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />

              <label>Full name</label>
              <input
                type="text"
                name="fullname"
                value={form.fullname}
                onChange={handleChange}
              />

              <label>Bio</label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
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

            {/* FULLSCREEN POPUP */}
            {showAvatarPopup && (
              <div
                className="avatar-popup-overlay"
                onClick={() => setShowAvatarPopup(false)}
              >
                <div
                  className="avatar-popup-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img src={avatarSrc} className="avatar-popup-image" />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}