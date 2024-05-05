import "./footer.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouttubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";

function Footer() {
  return (
    <div className="footer">
      <div className="upper-footer">
        <a href="/home">
          <img className="logo" src="/mansion.svg" />
        </a>

        <div className="company">
          <h2>Company</h2>
          <a href="">About</a>
          <a href="">Contact Us</a>
          <a href="">Our Stores</a>
        </div>
        <div className="support">
          <h2>Support</h2>
          <a href="">Shipping</a>
          <a href="">Return Policy</a>
        </div>
      </div>
      <div className="lower-footer">
        <span className="rights">Mansion @Rights are reserved</span>
        <div className="social-media">
          <a href="https://facebook.com" target="_blank">
            <FacebookIcon style={{ color: "white" }} />
          </a>

          <a href="https://instagram.com" target="_blank">
            <InstagramIcon style={{ color: "white" }} />
          </a>
          <a href="https://Youtube.com" target="_blank">
            <YouttubeIcon style={{ color: "white" }} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
