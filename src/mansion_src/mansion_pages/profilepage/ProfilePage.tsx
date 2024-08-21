import { ChangeEvent, useEffect, useState } from "react";
import "./profilepage.scss"; // Optional: Create a CSS file for styling
import { findData, updateUserData } from "../utils/fetchData";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  const [userAddress, setUserAddress] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserAddress({
      ...userAddress,
      [name]: value,
    });
  };
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    findData("user")
      .then((data) => {
        if (data.user) {
          setUserData(data.user);
        }
        if (data.user && data.user.address) {
          setUserAddress(data.user.address);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdateClick = async () => {
    updateUserData({ ...userData, address: userAddress })
      .then(() => {
        console.log("updated");
      })
      .catch(() => {
        console.log("some error occured while updating user data");
      });
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src="https://via.placeholder.com/150" // Replace with user profile picture
            alt="User Profile"
            className="profile-pic"
          />
          <div className="profile-info">
            <>
              <div className="labeled-input">
                <label htmlFor="name">Name </label>
                <input
                  type="text"
                  name="name"
                  disabled={!isEditing}
                  value={userData.name}
                  onChange={handleInputChange}
                  className="profile-input"
                />
              </div>
              <div className="labeled-input">
                <label htmlFor="email">Email </label>
                <input
                  type="email"
                  name="email"
                  disabled={!isEditing}
                  value={userData.email}
                  onChange={handleInputChange}
                  className="profile-input"
                />
              </div>
              <div className="labeled-input">
                <label htmlFor="address1">Address1 </label>
                <input
                  type="text"
                  name="address1"
                  disabled={!isEditing}
                  value={userAddress.address1}
                  onChange={handleAddressChange}
                  className="profile-input"
                />
              </div>
              <div className="labeled-input">
                <label htmlFor="address2">Address2 </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  name="address2"
                  value={userAddress.address2}
                  onChange={handleAddressChange}
                  className="profile-input"
                />
              </div>
              <div className="labeled-input">
                <label htmlFor="city">city </label>
                <input
                  type="text"
                  name="city"
                  disabled={!isEditing}
                  value={userAddress.city}
                  onChange={handleAddressChange}
                  className="profile-input"
                />
              </div>
              <div className="labeled-input">
                <label htmlFor="state">state </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  name="state"
                  value={userAddress.state}
                  onChange={handleAddressChange}
                  className="profile-input"
                />
              </div>
              <div className="labeled-input">
                <label htmlFor="pincode">pincode </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  name="pincode"
                  value={userAddress.pincode}
                  onChange={handleAddressChange}
                  className="profile-input"
                />
              </div>
              <div className="labeled-input">
                <label htmlFor="country">Country </label>
                <input
                  type="text"
                  name="country"
                  value={userAddress.country}
                  disabled
                  className="profile-input"
                />
              </div>
            </>
          </div>
        </div>
        <div className="profile-actions">
          <button onClick={handleEditClick} className="edit-btn">
            {isEditing ? "Cancel" : "Edit"}
          </button>
          {isEditing && (
            <button onClick={handleUpdateClick} className="update-btn">
              Update
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
