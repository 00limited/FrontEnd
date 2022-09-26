import UploadFilm from "./UploadFilm/UploadFilm";
import NavbarLogin from "./navbar/navbarMain";

function Upload() {
  return (
    <div style={{ paddingBottom: "80px" }}>
      <NavbarLogin />
      <UploadFilm />
    </div>
  );
}

export default Upload;
