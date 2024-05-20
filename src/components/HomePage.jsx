import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import val_1 from "../img/gtr1.png";
import val_2 from "../img/gtr2.png";
import val_3 from "../img/gtr3.png";
import val_4 from "../img/gtr4.png";
import val_5 from "../img/gtr5.png";
import CountUp from "react-countup";
import equip_1 from "../img/1.jpg";
import equip_2 from "../img/2.jpg";
import equip_3 from "../img/3.jpg";
import equip_4 from "../img/4.jpg";
import equip_5 from "../img/5.jpg";
import equip_6 from "../img/6.jpg";
import equip_7 from "../img/7.jpg";
import equip_8 from "../img/8.jpg";
import way_1 from "../img/way_1.jpg";
import way_2 from "../img/way_2.jpg";
import way_3 from "../img/way_3.jpg";
import way_4 from "../img/way_4.jpg";
import HCM_branch from "../img/HN_branch.jpg";
import HN_branch from "../img/HCM_branch.jpg";
import da_lieu from "../img/khoa-da-lieu.png";
import PHCN from "../img/khoa-phuc-hoi-chuc-nang.png";
import sinhsan from "../img/khoa_ivf.png";
import khoamat from "../img/khoa_mat.png";
import khoarang from "../img/khoa_rang.png";
import phukhoa from "../img/khoa_sanphukhoa.png";
import ICU from "../img/icon-khoa-hoi-suc-cap-cuu-icu.png";
import khoavu from "../img/icon-khoa-ngoai-vu-2023.png";
import ScrollTrigger from "react-scroll-trigger";
//import 'slick-carousel/slick/slick.css';
//import 'slick-carousel/slick/slick-theme.css';
//import '@fancyapps/ui/dist/fancybox/fancybox.css'; LỖI
import Style_css from './../css/style.module.css'
import Base_css from './../css/base.module.css';
import HCMUT_LOGO from "./../img/HCMUT_official_logo.png";
import car_1 from "../img/banner-kham-vip-ivf-desk.jpg";
import car_2 from "../img/banner-khoa-nhi-ban-pc.jpg";
import car_3 from "../img/banner-thay-khop-hang-optimys.jpg";
import car_4 from "../img/tam-soat-dot-quy-truy-tim-moi-nguy-co-desk.jpg";
import car_5 from "../img/tam-soat-tmh-desk.jpg";
import { CarouselItem } from "react-bootstrap";
import Slider from "react-slick";
function Home() {
  return (
    <div>
      <Header />
      <Values />
      <InforEmployer />
      <ModernEquipment />
      <HospitalSystem />
      <Departments />
      <Footer />
      <BackToTop />
    </div>
  );
}

function Header() {
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
                    Đặt lịch khám
                  </a>
                </li>

                <li>
                  <a
                    href="/signup"
                    style={{ color: "#FFDF5F" }}
                    className="signIn_Up"
                  >
                    Đăng nhập / Đăng ký
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
      <nav className={Base_css.list}>
        <div className={Base_css.wrapper}>
          <div className="container_list">
            <ul>
              <li className={`${Base_css.active} ${Base_css.dropdown_layer}`}>
                <a href="./index.html">Giới thiệu</a>
                <div className={Base_css[`dropdown-content`]}>
                  <a href="./gioi_thieu.html" className="a_drop">
                    Option 1
                  </a>
                </div>
              </li>
              <li className={Base_css[`non-dropdown`]}>
                <a href="#">Chuyên Khoa</a>
              </li>
              <li className={Base_css[`non-dropdown`]}>
                <a href="./tien_nghi.html">Tiện nghi</a>
              </li>
              <li className={Base_css[`non-dropdown`]}>
                <a href="./specialist-doctor1.html">Chuyên gia - Bác sĩ</a>
              </li>
              <li className={Base_css[`non-dropdown`]}>
                <a href="./thanh_tuu.html">Thành tựu</a>
              </li>
              <li className={Base_css[`non-dropdown`]}>
                <a href="contact.html">Liên Hệ</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
}

function Values() {
  return (
    <section className={Style_css.values}>
      <div className={Base_css.wrapper}>
        <div className={Style_css.value_title}>
          <h2>GIÁ TRỊ KHÁC BIỆT CỦA BÁCH KHOA</h2>
        </div>
        <div className={Style_css.values_content}>
          <div className={`${Style_css.values_item} ${Style_css.item}`}>
            <div className={`${Style_css[`values_item_detail`]} ${Style_css.item_white}`}>
              <a href="#" alt="hinh values_1">
                <div className="wrapper_img">
                  <img src={val_1} alt="hinh value_1" />
                </div>
                <br />
                <span>
                  Chuyên gia đầu ngành - bác sĩ giỏi - chuyên viên giàu kinh
                  nghiệm
                </span>
              </a>
            </div>
          </div>
          <div className={`${Style_css.values_item} ${Style_css.item}`}>
            <div className={`${Style_css[`values_item_detail`]} ${Style_css.item_white}`}>
              <a href="#" alt="hinh values_1">
                <div className="wrapper_img">
                  <img src={val_2} alt="hinh value_1" />
                </div>
                <br />
                <span>Trang thiết bị hiện đại bậc nhất</span>
              </a>
            </div>
          </div>
          <div className={`${Style_css.values_item} ${Style_css.item}`}>
            <div className={`${Style_css[`values_item_detail`]} ${Style_css.item_white}`}>
              <a href="#" alt="hinh values_1">
                <div className="wrapper_img">
                  <img src={val_3} alt="hinh value_1" />
                </div>
                <br />
                <span>Hiệu quả điều trị cao Thành tựu nổi bật</span>
              </a>
            </div>
          </div>
          <div className={`${Style_css.values_item} ${Style_css.item}`}>
            <div className={`${Style_css[`values_item_detail`]} ${Style_css.item_white}`}>
              <a href="#" alt="hinh values_1">
                <div className="wrapper_img">
                  <img src={val_4} alt="hinh value_1" />
                </div>
                <br />
                <span>Quy trình toàn diện, khoa học, chuyên nghiệp</span>
              </a>
            </div>
          </div>
          <div className={`${Style_css.values_item} ${Style_css.item}`}>
            <div className={`${Style_css[`values_item_detail`]} ${Style_css.item_white}`}>
              <a href="#" alt="hinh values_1">
                <div className="wrapper_img">
                  <img src={val_5} alt="hinh value_1" />
                </div>

                <br />
                <span>Dịch vụ cao cấp Chi phí hợp lý</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InforEmployer() {
  const [CounterOn, setCounterOn] = useState(false);
  return (
    <section className={Style_css.infor_employer}>
      <div className={Base_css.wrapper}>
        <div className={Style_css.infor_title}>
          <h2>
            Chuyên gia đầu ngành - bác sĩ giỏi - chuyên viên giàu kinh nghiệm
          </h2>
          <p>
            Quy tụ đội ngũ chuyên gia đầu ngành, bác sĩ chuyên môn cao, giàu
            kinh nghiệm.
          </p>
        </div>
        <div className={Style_css.main_infor}>
          <div className={Style_css.main_infor_detail}>
            <h2 className="counter" data-counter-time="1500">
              <ScrollTrigger
                onEnter={() => setCounterOn(true)}
                onExit={() => setCounterOn(false)}
              >
                {CounterOn && (
                  <CountUp start={0} end={24} duration={2} delay={0} />
                )}
              </ScrollTrigger>
            </h2>
            <p>Giáo sư - P. Giáo sư</p>
          </div>
          <div className={Style_css.main_infor_detail}>
            <h2 className="counter" data-counter-time="1500">
              <ScrollTrigger
                onEnter={() => setCounterOn(true)}
                onExit={() => setCounterOn(false)}
              >
                {CounterOn && (
                  <CountUp start={0} end={171} duration={2} delay={0} />
                )}
              </ScrollTrigger>
            </h2>
            <p>Tiến sĩ - Bác sĩ CKII</p>
          </div>
          <div className={Style_css.main_infor_detail}>
            <h2 className="counter" data-counter-time="1500">
              <ScrollTrigger
                onEnter={() => setCounterOn(true)}
                onExit={() => setCounterOn(false)}
              >
                {CounterOn && (
                  <CountUp start={0} end={490} duration={2} delay={0} />
                )}
              </ScrollTrigger>
            </h2>
            <p>Thạc sĩ - Bác sĩ CKI</p>
          </div>
          <div className={Style_css.main_infor_detail}>
            <h2 className="counter" data-counter-time="1500">
              <ScrollTrigger
                onEnter={() => setCounterOn(true)}
                onExit={() => setCounterOn(false)}
              >
                {CounterOn && (
                  <CountUp start={0} end={786} duration={2} delay={0} />
                )}
              </ScrollTrigger>
            </h2>
            <p>Bác sĩ</p>
          </div>
          <div className={Style_css.main_infor_detail}>
            <h2 className="counter" data-counter-time="1500">
              <ScrollTrigger
                onEnter={() => setCounterOn(true)}
                onExit={() => setCounterOn(false)}
              >
                {CounterOn && (
                  <CountUp start={0} end={155} duration={2} delay={0} />
                )}
              </ScrollTrigger>
            </h2>
            <p>Kỹ thuật viên</p>
          </div>
          <div className={Style_css.main_infor_detail}>
            <h2 className="counter" data-counter-time="1500">
              <ScrollTrigger
                onEnter={() => setCounterOn(true)}
                onExit={() => setCounterOn(false)}
              >
                {CounterOn && (
                  <CountUp start={0} end={803} duration={2} delay={0} />
                )}
              </ScrollTrigger>
            </h2>
            <p>Điều dưỡng</p>
          </div>
        </div>
        <div className={Style_css.view}>
          <a href="#" className={Style_css.view_expert}>
            Xem các chuyên gia
          </a>
        </div>
      </div>
    </section>
  );
}

function ModernEquipment() {
  return (
    <section className={Style_css.modern_equipment}>
      <div className={Style_css.equipment_title}>
        <h2>Trang thiết bị hiện đại bậc nhất</h2>
        <p>
          Sở hữu hệ thống trang thiết bị cao cấp, hàng đầu thế giới trong chẩn
          đoán và điều trị.
        </p>
      </div>
      <div className={Style_css.sub__wrapper}>
        <div className={Style_css.equipment__container}>
          <div className={Style_css.equipment__item}>
            <img src={equip_1} alt="" />

            <a
              href={equip_1}
              data-fancybox="gallery"
              data-caption="Máy phẫu thuật khúc xạ Femtosecond laser VISUMAX 800"
            >
              <div className={Style_css[`equipment-layer`]}>
                <h3>Máy phẫu thuật khúc xạ Femtosecond laser VISUMAX 800</h3>
                <p>
                  Bước tiến đột phá từ công nghệ ReLEx SMILE. Mổ cận thị SMILE
                  PRO đang là lựa chọn hoàn hảo nhất cho khách hàng. SMILE PRO
                  giảm hơn 80% tình trạng khô...
                </p>
              </div>
            </a>
          </div>
          <div className={Style_css.equipment__item}>
            <img src={equip_2} alt="" />
            <a
              href={equip_2}
              data-fancybox="gallery"
              data-caption="Máy chụp cắt lớp võng mạc quang học OCT Cirrus 6000"
            >
              <div className={Style_css[`equipment-layer`]}>
                <h3>Máy chụp cắt lớp võng mạc quang học OCT Cirrus 6000</h3>
                <p>
                  Cirrus 6000 là thế hệ mới nhất trong các thiết bị chụp đáy mắt
                  OCT của hãng Carl Zeiss (Đức). Thiết bị mang tới khả năng chụp
                  ảnh tốc độ cao với...
                </p>
              </div>
            </a>
          </div>
          <div className={Style_css.equipment__item}>
            <img src={equip_3} alt="" />
            <a
              href={equip_3}
              data-fancybox="gallery"
              data-caption="Máy chụp CT 768 lát cắt"
            >
              <div className={Style_css[`equipment-layer`]}>
                <h3>Máy chụp CT 768 lát cắt</h3>
                <p>
                  Somatom Drive (Siemens - Đức) là hệ thống chụp cắt lớp vi tính
                  (CT) hai đầu bóng cao cấp nhất hiện nay với khả năng tái tạo
                  lên đến 768 lát cắt giúp...
                </p>
              </div>
            </a>
          </div>
          <div className={Style_css.equipment__item}>
            <img src={equip_4} alt="" />
            <a
              href={equip_4}
              data-fancybox="gallery"
              data-caption="Máy phẫu thuật khúc xạ Excimer laser Mel 90"
            >
              <div className={Style_css[`equipment-layer`]}>
                <h3>Máy phẫu thuật khúc xạ Excimer laser Mel 90</h3>
                <p>
                  Máy Laser Excimer tiên tiến, được thiết kế đặc biệt cho nhu
                  cầu của bác sĩ phẫu thuật khúc xạ hiện đại. Mel 90 có tính
                  năng vượt trội như chức năng...
                </p>
              </div>
            </a>
          </div>
          <div className={Style_css.equipment__item}>
            <img src={equip_5} alt="" />
            <a
              href={equip_5}
              data-fancybox="gallery"
              data-caption="Hệ thống Robot Modus V Synaptive duy nhất tại Việt Nam"
            >
              <div className={Style_css[`equipment-layer`]}>
                <h3>Hệ thống Robot Modus V Synaptive duy nhất tại Việt Nam</h3>
                <p>
                  Hệ thống Robot Modus V Synaptive được sử dụng trong mổ não duy
                  nhất tại Việt Nam hiện nay. Trên thế giới hiện chỉ mới có 10
                  nước sử dụng robot này. Sự...
                </p>
              </div>
            </a>
          </div>
          <div className={Style_css.equipment__item}>
            <img src={equip_6} alt="" />
            <a
              href={equip_6}
              data-fancybox="gallery"
              data-caption="Hệ thống phẫu thuật robot"
            >
              <div className={Style_css[`equipment-layer`]}>
                <h3>Hệ thống phẫu thuật robot</h3>
                <p>
                  BVĐK Tâm Anh đầu tư phòng mổ Hybrid vô khuẩn hiện đại nhất
                  hiện nay kết hợp công nghệ phẫu thuật bằng hệ thống robot
                  Artis Pheno (Siemens) - đầu tiên...
                </p>
              </div>
            </a>
          </div>
          <div className={Style_css.equipment__item}>
            <img src={equip_7} alt="" />
            <a
              href={equip_7}
              data-fancybox="gallery"
              data-caption="Hệ thống nuôi cấy phôi ứng dụng trí tuệ nhân tạo"
            >
              <div className={Style_css[`equipment-layer`]}>
                <h3>Hệ thống nuôi cấy phôi ứng dụng trí tuệ nhân tạo</h3>
                <p>
                  Tủ nuôi cấy phôi Timelapse Geri®️+ kết hợp trí tuệ nhân tạo AI
                  (với phần mềm đánh giá phôi tự động Eeva) được trang bị kính
                  hiển vi riêng biệt, camera...
                </p>
              </div>
            </a>
          </div>
          <div className={Style_css.equipment__item}>
            <img src={equip_8} alt="" />
            <a
              href={equip_8}
              data-fancybox="gallery"
              data-caption="Máy phẫu thuật khúc xạ Femtosecond laser VISUMAX 800"
            >
              <div className={Style_css[`equipment-layer`]}>
                <h3>Máy phẫu thuật khúc xạ Femtosecond laser VISUMAX 800</h3>
                <p>
                  Bước tiến đột phá từ công nghệ ReLEx SMILE. Mổ cận thị SMILE
                  PRO đang là lựa chọn hoàn hảo nhất cho khách hàng. SMILE PRO
                  giảm hơn 80% tình trạng khô...
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function HospitalSystem() {
  return (
    <section className={Style_css.hospital_system}>
      <div className={Base_css.wrapper}>
        <div className={Style_css.value_title}>
          <h2>GIÁ TRỊ KHÁC BIỆT CỦA BÁCH KHOA</h2>
        </div>
        <div className={Style_css.hospital_system_content}>
          <div className={Style_css.system_detail}>
            <div className="HCMlocation_img">
              <img src={HN_branch} alt="HCM_branch" />
            </div>
            <div className={Style_css.location_text_map}>
              <p>Bệnh viện Đa Khoa Bách Khoa TP.Hồ Chí Minh</p>
              <div className={Style_css.location_contact}>
                <a href="./contact.html" className={Style_css[`btn-contact`]}>
                  Liên hệ
                </a>
                <a
                  href="https://maps.app.goo.gl/wNWcJouj4B4vcxgaA"
                  className={Style_css[`btn-findmap`]}
                  target="_blank"
                >
                  Tìm đường
                </a>
              </div>
            </div>
          </div>

          <div className={Style_css.system_detail}>
            <div className="HNlocation_img">
              <img src={HCM_branch} alt="HN_branch" />
            </div>
            <div className={Style_css.location_text_map}>
              <p>Bệnh viện Đa Khoa Bách Khoa Hà Nội</p>
              <div className={Style_css.location_contact}>
                <a href="./contact.html" className={Style_css[`btn-contact`]}>
                  Liên hệ
                </a>
                <a
                  href="https://maps.app.goo.gl/Gpr1qDrBcMHxZqPz7"
                  className={Style_css[`btn-findmap`]}
                  target="_blank"
                >
                  Tìm đường
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Departments() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
  return (
    <section className={Style_css.Departments}>
      <div className={Base_css.wrapper}>
        <div className={Style_css.value_title}>
          <h2>CHUYÊN KHOA</h2>
        </div>
        <div className={Style_css.departments_content}>
          <Slider {...settings}>
            <div className="department_wrapper">
              <div className={Style_css.department__item}>
                <div className={Style_css.item_icon}>
                  <img src={da_lieu} alt="ảnh da liễu" />
                </div>
                <a href="#">
                  KHOA DA LIỄU <br />- THẨM MỸ DA
                </a>
              </div>
            </div>

            <div className="department_wrapper">
              <div className={Style_css.department__item}>
                <div className={Style_css.item_icon}>
                  <img src={PHCN} alt="khoa hồi phục chức năng" />
                </div>
                <a href="#">
                  KHOA PHỤC HỒI <br />
                  CHỨC NĂNG
                </a>
              </div>
            </div>

            <div className="department_wrapper">
              <div className={Style_css.department__item}>
                <div className={Style_css.item_icon}>
                  <img src={sinhsan} alt="trung tâm hỗ trợ sinh sản" />
                </div>
                <a href="#">
                  TRUNG TÂM <br />
                  HỖ TRỢ SINH SẢN
                </a>
              </div>
            </div>

            <div className="department_wrapper">
              <div className={Style_css.department__item}>
                <div className={Style_css.item_icon}>
                  <img src={khoamat} alt="khoa mắt" />
                </div>
                <a href="#">
                  TRUNG TÂM MẮT <br /> CÔNG NGHỆ CAO
                </a>
              </div>
            </div>

            <div className="department_wrapper">
              <div className={Style_css.department__item}>
                <div className={Style_css.item_icon}>
                  <img src={khoarang} alt="khoa răng" />
                </div>
                <a href="#">KHOA RĂNG HÀM MẶT</a>
              </div>
            </div>

            <div className="department_wrapper">
              <div className={Style_css.department__item}>
                <div className={Style_css.item_icon}>
                  <img src={phukhoa} alt="khoa sản phụ khoa" />
                </div>
                <a href="#">
                  TRUNG TÂM <br />
                  SẢN PHỤ KHOA
                </a>
              </div>
            </div>

            <div className="department_wrapper">
              <div className={Style_css.department__item}>
                <div className={Style_css.item_icon}>
                  <img src={ICU} alt="khoa hồi sức cấp cứu" />
                </div>
                <a href="#">
                  KHOA HỒI SỨC <br /> CẤP CỨU (ICU)
                </a>
              </div>
            </div>

            <div className="department_wrapper">
              <div className={Style_css.department__item}>
                <div className={Style_css.item_icon}>
                  <img src={khoavu} alt="khoa vú" />
                </div>
                <a href="#">KHOA NGOẠI VÚ</a>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </section>
  );
}


function Footer() {
  return (
    <footer>
      <div className={Base_css.footer_content}>
        <div className={Base_css.footer_item}>
          <img src={HCMUT_LOGO} alt="logo_hcmut" />
          <h2>Bách Khoa Hospital</h2>
        </div>
        <div className={Base_css.footer_item}>
          <div className={Base_css.footer_item_title}>
            <h3>HỆ THỐNG BỆNH VIỆN</h3>
            <hr />
          </div>
          <div className={Base_css.footer_item_location}>
            <i className="fa-sharp fa-regular fa-location-dot"></i>
            <p>108 Phố Hoàng Như Tiếp, P. Bồ Đề, Q. Long Biên, Tp. Hà Nội</p>
          </div>
          <div className={Base_css.footer_item_location}>
            <i className="fa-sharp fa-regular fa-location-dot"></i>
            <p>2B Phổ Quang, Phường 2, Q. Tân Bình, Tp. Hồ Chí Minh</p>
          </div>
        </div>
        <div className="footer_item_3">
          <div className={Base_css.footer_item_hcm}>
            <div className={Base_css.hcm_icon_number}>
              <i className="fa fa-phone"></i>
              <div className={Base_css.hcm_number}>
                <a href="tel:0855628333">0855628333</a>
                <br />
                <a href="tel:0855628555">0855628555</a>
              </div>
            </div>

            <div className={Base_css[`time-email`]}>
              <p>làm việc từ 7:30 - 16:30</p>
              <div className={Base_css.mail}>
                <i className="fa fa-envelope"></i>
                <p>cskh@tamanhhospital.vn</p>
              </div>
            </div>
          </div>
          <div className={Base_css.footer_item_hn}>
            <div className={Base_css.hcm_icon_number}>
              <i className="fa fa-phone"></i>
              <div className={Base_css.hcm_number}>
                <a href="tel:0855628333">0855628333</a>
                <br />
                <a href="tel:0855628555">0855628555</a>
              </div>
            </div>

            <div className={Base_css[`time-email`]}>
              <p>làm việc từ 7:30 - 16:30</p>
              <div className={Base_css.mail}>
                <i className="fa fa-envelope"></i>
                <p>cskh@tamanhhospital.vn</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={Base_css.company_infor}>
        <p>
          CÔNG TY CỔ PHẦN BỆNH VIỆN ĐA KHOA BÁCH KHOA <br />
          Số đăng ký kinh doanh: 0102362369 <br />
          cấp bởi Sở kế hoạch và đầu tư Thành phố Hà Nội, đăng ký lần đầu ngày
          11 tháng 9 năm 2007
        </p>
      </div>
    </footer>
  );
}

function BackToTop() {
  return (
    <a href="#" className="back-to-top cd-top text-replace js-cd-top">
      <i className="fa-sharp fa-light fa-arrow-up"></i>
    </a>
  );
}

export default Home;
