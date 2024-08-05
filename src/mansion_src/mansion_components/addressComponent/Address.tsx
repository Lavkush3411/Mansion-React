import { ChangeEvent, SetStateAction, useState } from "react";
import Button from "../button/Button";
import "./address.scss";
import zod from "zod";

const zodAddressSchema = zod.object({
  address1: zod.string().min(1, { message: "Address1 is required" }),
  address2: zod.string().min(1, { message: "Address2 is required" }),
  city: zod.string().min(1, { message: "City is required" }),
  state: zod.string().min(1, { message: "State is required" }),
  pincode: zod.string().min(1, { message: "Pincode is required" }),
  country: zod.string().min(1, { message: "Country is required" }),
});

type AddressSchema = zod.infer<typeof zodAddressSchema>;

function Address({
  onButtonClick,
}: {
  onButtonClick: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [address, setAddress] = useState<AddressSchema>({
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });
  const [error, setError] = useState("");

  function onAddressChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    console.log("changed");
    const name = e.target.name;
    setAddress((prev) => ({ ...prev, [name]: e.target.value }));
  }

  function onAddressConfirm(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    if (!zodAddressSchema.safeParse(address).success) {
      setError("Please Fill out complete Address");
      return;
    }
    e.preventDefault();
    onButtonClick(false);
  }
  return (
    <main className="main-section">
      <div className="form">
        <input
          required
          type="text"
          className="form-input"
          name="address1"
          value={address.address1}
          placeholder="Address1"
          onChange={onAddressChange}
        />
        <input
          required
          type="text"
          value={address.address2}
          className="form-input"
          name="address2"
          placeholder="Address2"
          onChange={onAddressChange}
          id=""
        />

        <input
          required
          type="text"
          className="form-input"
          value={address.city}
          onChange={onAddressChange}
          name="city"
          placeholder="City"
          id=""
        />
        <input
          required
          type="text"
          className="form-input"
          name="state"
          value={address.state}
          placeholder="State"
          onChange={onAddressChange}
          id=""
        />
        <input
          required
          type="text"
          className="form-input"
          name="pincode"
          placeholder="PinCode"
          value={address.pincode}
          onChange={onAddressChange}
          id=""
        />
        <input
          required
          type="text"
          className="form-input"
          name="country"
          placeholder="Country"
          value={address.country}
          disabled
          id=""
        />
      </div>
      <div className="error">{error}</div>
      <div className="button-wrapper">
        <Button onClick={onAddressConfirm} type="submit">
          Confirm Address
        </Button>
      </div>
    </main>
  );
}

export default Address;
