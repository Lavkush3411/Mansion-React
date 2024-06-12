import { SetStateAction } from "react";
import Button from "../button/Button";
import "./address.scss";

function Address({
  onButtonClick,
}: {
  onButtonClick: React.Dispatch<SetStateAction<boolean>>;
}) {
  function onAddressConfirm(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    onButtonClick(false);
  }
  return (
    <main className="main-section">
      <form action="">
        <input
          required
          type="text"
          className="form-input"
          name=""
          placeholder="Address1"
          id=""
        />
        <input
          required
          type="text"
          className="form-input"
          name=""
          placeholder="Address2"
          id=""
        />

        <input
          required
          type="text"
          className="form-input"
          name=""
          placeholder="City"
          id=""
        />
        <input
          required
          type="text"
          className="form-input"
          name=""
          placeholder="State"
          id=""
        />
        <input
          required
          type="text"
          className="form-input"
          name="pincode"
          placeholder="PinCode"
          id=""
        />
      </form>
      <div className="button-wrapper">
        <Button onClick={onAddressConfirm} type="submit">
          Confirm Address
        </Button>
      </div>
    </main>
  );
}

export default Address;
