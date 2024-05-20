import React from 'react';
import Base_css from "./../css/base.module.css";
import HCMUT_LOGO from "./../img/HCMUT_official_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocation, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';  // Import useNavigate từ react-router-dom
import { UserAuth } from '../context/Auth';  // Import UserAuth để truy cập logout

function HeaderPage() {
  const { logout } = UserAuth();  // Lấy hàm logout từ context
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/signup');  // Điều hướng đến trang đăng nhập sau khi logout
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <section className={Base_css[`header-nav`]} id="header_">
      <header className={Base_css.base}>
        <div className={Base_css.wrapper}>
          <div className={Base_css.header_content}>
            <div className={Base_css.hospital_logo}>
              <a href="#" className={Base_css[`hospital_logo-link`]}>
                <img
                  className={Base_css.header_logo}
                  src={HCMUT_LOGO}
                  alt="hospital_logo"
                />
                <div className={Base_css.hospital_logo_text}>
                  <h2>Bách Khoa Hospital</h2>
                </div>
              </a>
            </div>
            <nav className={Base_css.logo_list}>
              <div className={Base_css.logo_list__location}>
                <a className="number" href="tel:0855628333">
                  <FontAwesomeIcon icon={faLocation} className="icon_header" />
                  <span>Thành Phố Hồ Chí Minh - 0855 628 333 </span>
                </a>
              </div>
              <ul>
                <li>
                  <a href="#">
                    <FontAwesomeIcon icon={faPhone} className="icon_header" />
                    Hỏi đáp
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FontAwesomeIcon
                      icon={faCalendar}
                      className="icon_header"
                    />
                    UY TÍN TẠO NIỀM TIN
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="avatar_infor">
          <a href="#">
            <img src="" alt="" />
          </a>
        </div>
      </header>
      <nav className={`${Base_css.list} ${Base_css.base}`}>
        <div className={`${Base_css.wrapper} ${Base_css.base}`}>
          <div className="container_list">
            <ul>
              <li className={`${Base_css[`non-dropdown`]} ${Base_css.base}`}>
                <a href="/MedicalEquipmentManager">OBJECT MANAGE</a>
              </li>
              <li className={`${Base_css[`non-dropdown`]} ${Base_css.base}`}>
                <a href="/MedicinesList">MEDICINES MANAGE</a>
              </li>
              <li className={`${Base_css[`non-dropdown`]} ${Base_css.base}`}>
                <a href="/ListPatients">PATIENT'S</a>
              </li>
              <li className={`${Base_css[`non-dropdown`]} ${Base_css.base}`}>
                <a href="#" onClick={handleLogout}>LOG OUT</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
}

export default HeaderPage;
