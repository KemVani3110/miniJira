import { useLanguage } from "../context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import "../styles/LanguageToggle.css";

const LanguageToggle = () => {
  const { lang, toggleLanguage } = useLanguage();

  const nextLang = lang === "en" ? "vi" : "en";
  const buttonLabel = nextLang.toUpperCase();

  return (
    <button className="language-toggle-btn" onClick={toggleLanguage}>
      <FontAwesomeIcon icon={faGlobe} /> {buttonLabel}
    </button>
  );
};

export default LanguageToggle;
