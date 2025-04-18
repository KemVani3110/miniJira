import { useLanguage } from "../context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import "../styles/LanguageToggle.css";

const LanguageToggle = () => {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <button className="language-toggle-btn" onClick={toggleLanguage}>
      <FontAwesomeIcon icon={faGlobe} /> {lang === "en" ? "VI" : "EN"}
    </button>
  );
};

export default LanguageToggle;
