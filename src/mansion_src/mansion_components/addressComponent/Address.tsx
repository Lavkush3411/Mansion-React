import {
  ChangeEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Button from "../button/Button";
import "./address.scss";
import zod from "zod";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";
import toast from "react-hot-toast";

const env = import.meta.env;

const zodAddressSchema = zod.object({
  address1: zod
    .string({ message: "Address should be valid text " })
    .min(1, { message: "Address 1 is required" }),
  address2: zod
    .string({ message: "Address should be valid text" })
    .min(1, { message: "Address 2 is required" }),
  city: zod
    .string({ message: "City should be valid text" })
    .min(1, { message: "City is required" }),
  state: zod.string().min(1, { message: "State is required" }),
  pincode: zod
    .string({ message: "Enter valid digits only in pincode" })
    .min(1, { message: "Pincode is required" }),
  contact: zod
    .string({ message: "Contact number should be valid digits only" })
    .min(10, { message: "Contact should be a 10 digit valid number" })
    .max(12, { message: "Contact number should not exceed 12 digits" })
    .regex(/^\d+$/, { message: "Contact number should only contain digits" }), // Ensure only digits
  country: zod.string().min(1, { message: "Country is required" }),
});

type AddressSchema = zod.infer<typeof zodAddressSchema>;
interface AddressWithIndexSignature extends AddressSchema {
  [key: string]: string; // Add index signature for dynamic properties
}

function Address({
  onButtonClick,
}: {
  onButtonClick: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [address, setAddress] = useState<AddressWithIndexSignature>({
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    contact: "",
    country: "India",
  });
  const [addressUpdateLoader, setAddressUpdateLoader] = useState(false);
  const refToAddress = useRef<AddressWithIndexSignature>();

  useEffect(() => {
    axios
      .get(env.VITE_BASE_URL + "user/address", { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setAddress(res.data.address);
          refToAddress.current = res.data.address;
        }
      });
  }, []);

  function onAddressChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const name = e.target.name;
    setAddress((prev) => ({ ...prev, [name]: e.target.value }));
  }

  async function onAddressConfirm(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    let isAddressChanged = false;
    const currentAddressInDb = refToAddress.current;

    for (const add in address) {
      if (!currentAddressInDb || currentAddressInDb[add] != address[add]) {
        console.log("add changed");
        isAddressChanged = true;
      }
    }

    setAddressUpdateLoader(true);

    try {
      // Validate the address using Zod schema
      zodAddressSchema.parse(address);
    } catch (error) {
      if (error instanceof zod.ZodError) {
        const e = error.errors.map((err) => err.message).join(", ");
        toast.error(e);
        setAddressUpdateLoader(false);
        return;
      } else {
        console.log("Unexpected error:", error);
      }
    }

    e.preventDefault();

    if (isAddressChanged) {
      await axios.post(
        env.VITE_BASE_URL + "user/address",
        { address },
        { withCredentials: true }
      );
      onButtonClick(false);
      setAddressUpdateLoader(false);
    } else {
      onButtonClick(false);
      setAddressUpdateLoader(false);
    }
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
        />
        <input
          required
          type="text"
          className="form-input"
          value={address.city}
          onChange={onAddressChange}
          name="city"
          placeholder="City"
        />
        <input
          required
          type="text"
          className="form-input"
          name="state"
          value={address.state}
          placeholder="State"
          onChange={onAddressChange}
        />
        <input
          required
          type="text"
          className="form-input"
          name="pincode"
          placeholder="PinCode"
          value={address.pincode}
          onChange={onAddressChange}
        />
        <input
          required
          type="text"
          className="form-input"
          name="country"
          placeholder="Country"
          value={address.country}
          disabled
        />
        <input
          required
          type="text"
          className="form-input"
          name="contact"
          value={address.contact}
          placeholder="Contact"
          onChange={onAddressChange}
        />
      </div>
      <div className="button-wrapper">
        <Button
          onClick={onAddressConfirm}
          disabledState={addressUpdateLoader}
          type="submit"
        >
          {addressUpdateLoader ? <Spinner /> : "Confirm Address"}
        </Button>
      </div>
    </main>
  );
}

export default Address;
