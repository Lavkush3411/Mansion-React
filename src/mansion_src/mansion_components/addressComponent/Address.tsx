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

const env = import.meta.env;

const zodAddressSchema = zod.object({
  address1: zod.string().min(1, { message: "Address1 is required" }),
  address2: zod.string().min(1, { message: "Address2 is required" }),
  city: zod.string().min(1, { message: "City is required" }),
  state: zod.string().min(1, { message: "State is required" }),
  pincode: zod.string().min(1, { message: "Pincode is required" }),
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

  const [error, setError] = useState("");

  function onAddressChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    console.log("changed");
    const name = e.target.name;
    setAddress((prev) => ({ ...prev, [name]: e.target.value }));
  }

  async function onAddressConfirm(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    let isAddressChanged = false;
    const currentAddressInDb = refToAddress.current;

    for (let add in currentAddressInDb) {
      if (currentAddressInDb[add] != address[add]) {
        isAddressChanged = true;
      }
    }

    setAddressUpdateLoader(true);
    if (!zodAddressSchema.safeParse(address).success) {
      setError("Please Fill out complete Address");
      return;
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
