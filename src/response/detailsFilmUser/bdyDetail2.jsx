import video1 from "../../video/video1.mp4";
import dtl from "./BdyDetail.module.css";
function BdyDetail2() {
  return (
    <div>
      <div className={dtl.divUnit}>
        <div className={dtl.divMain}>
          <video width="400" controls>
            <source src={video1} type="video/mp4" />
            Your browser does not support HTML video.
          </video>
        </div>
      </div>
    </div>
  );
}

export default BdyDetail2;
