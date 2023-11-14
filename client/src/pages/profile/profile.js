import React, { useEffect, useState } from "react";
import "./Profile.scss";
import Pagemenu from "../../components/pagemenu/pagemenu";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/card/card";
import { getuser } from "../../redux/features/auth/authslice";
import { updateUser, updatePhoto } from "../../redux/features/auth/authslice";
import Loader from "../../components/loader/loader";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { shortenText } from "../../utilis/index";

const Cloud_name = process.env.REACT_APP_CLOUD_NAME;
const Upload_Preset = process.env.REACT_APP_UPLOAD_PRESET;

const Profile = () => {
  const { isLoading, user } = useSelector((state) => state.auth);
  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    photo: user?.photo || "",
    address: {
      address: user?.address.address || "",
      state: user?.address.state || "",
      country: user?.address.country || "",
    },
    role: user?.role || "",
  };
  const [profile, setProfile] = useState(initialState);
  const [imagePreview, setImagePreview] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const dispatch = useDispatch();

  const saveProfile = async (e) => {
    e.preventDefault();
    const userData = {
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      address: {
        address: profile.address,
        state: profile.state,
        country: profile.country,
      },
      role: profile.role,
    };
    await dispatch(updateUser(userData));
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  useEffect(() => {
    if (user === null) {
      dispatch(getuser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        photo: user?.photo || "",
        address: {
          address: user?.address.address || "",
          state: user?.address.state || "",
          country: user?.address.country || "",
        },
        role: user?.role || "",
      });
    }
  }, [dispatch, user]);

  const savePhoto = async (e) => {
    e.preventDefault();
    let imageUrl;
    try {
      if (
        profileImage !== null &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("upload_preset", Upload_Preset);
        image.append("cloud_name", Cloud_name);

        // save image to cloudary
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${Cloud_name}/image/upload`,
          {
            method: "post",
            body: image,
          }
        );
        const imgData = await response.json();
        // imageUrl = imgData.secure_url;
        imageUrl = imgData.url.toString();
      }
      // save image to mongodb
      const userData = {
        photo: profileImage ? imageUrl : profile.photo,
      };
      await dispatch(updatePhoto(userData));
      setImagePreview(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <section>
        {isLoading && <Loader />}
        <div className="container">
          <Pagemenu />
          <h1>Profile</h1>
          <div className="--flex-start profile">
            <Card cardClass={"card"}>
              {!isLoading && (
                <>
                  <div className="profile-photo">
                    <div>
                      {/* {imagePreview ? (
                        <img src={imagePreview} alt="profile" />
                      ) : (
                        <img src={user?.image} alt="profile" />
                      )} */}
                      <img
                        src={imagePreview === null ? user?.photo : imagePreview}
                        alt="profile"
                      />
                      <h3>Role: {profile.role}</h3>
                      {imagePreview !== null && (
                        <div className="--center-all">
                          <button
                            className="--btn --btn-secondary --btn-block"
                            onClick={savePhoto}
                          >
                            <BsFillCloudUploadFill size={18} /> update photo
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <form onSubmit={saveProfile}>
                    <p>
                      <label>change photo:</label>
                      <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleImageChange}
                      />
                    </p>
                    <p>
                      <label>name:</label>
                      <input
                        type="text"
                        name="name"
                        value={profile?.name}
                        onChange={handleInputChange}
                        required
                        pattern="[A-Za-z\s]+"
                      />
                    </p>
                    <p>
                      <label>email:</label>
                      <input
                        type="email"
                        name="email"
                        value={profile?.email}
                        onChange={handleInputChange}
                        readOnly
                        onFocus={(e) => e.target.removeAttribute("readonly")}
                      />
                    </p>
                    <p>
                      <label>phone:</label>
                      <input
                        type="text"
                        name="phone"
                        value={profile?.phone}
                        onChange={handleInputChange}
                        required
                        // pattern="[0-9]{10}"
                      />
                    </p>
                    <p>
                      <label>address:</label>
                      <input
                        type="text"
                        name="address"
                        value={profile?.address?.address}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <p>
                      <label>state:</label>
                      <input
                        type="text"
                        name="state"
                        value={profile?.address?.state}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <p>
                      <label>country:</label>
                      <input
                        type="text"
                        name="country"
                        value={profile?.address?.country}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <button className="--btn --btn-primary --btn-block">
                      update profile
                    </button>
                  </form>
                </>
              )}
            </Card>
          </div>
        </div>
        <div></div>
      </section>
    </>
  );
};

export const UserName = () => {
  const { user } = useSelector((state) => state.auth);
  const UserName = user?.name || "...";
  return (
    <span style={{ color: " #ff7722" }}>hi, {shortenText(UserName, 9)} </span>
  );
};

export default Profile;
