import { Form, InputGroup, Button } from "react-bootstrap";
import style from "./Payment.module.css";
import icons1 from "../iconPro/Vector.png";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { API } from "../../config/api";
import { useEffect } from "react";

function Payment() {
  let Navigate = useNavigate();
  let { data: user, refetch } = useQuery("Cache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.token,
      },
    };
    const response = await API.get("/check-auth", config);
    return response.data.data;
  });

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "process.env.REACT_APP_MIDTRANS_CLIENT_KEY";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handleBuy = useMutation(async (e) => {
    try {
      // Get data from product
      const data = {
        userId: user?.ID,
      };

      // Data body
      const body = JSON.stringify(data);

      // Configuration
      const config = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.token,
          "Content-type": "application/json",
        },
        body,
      };

      // Insert transaction data
      const response = await API.post("/transaction", config);

      console.log(response.data.data);

      // Create variabel for store token payment from response here ...
      const token = response.data.data.token;

      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          Navigate("/profile");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          Navigate("/profile");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });

      // Init Snap for display payment page with token here ...
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className={style.ap}>
      <div className={style.ab}>
        <h1 className="text-light text-center">Premium</h1>
        <p className="fs-5 text-center">
          Bayar sekarang dan nikmati streaming film-film yang kekinian dari
          <span className="text-danger "> DUMBFLIX</span>
        </p>
        <p className="fs-5 text-center">
          {" "}
          <span className="text-danger "> DUMBFLIX</span> : 0981312323
        </p>
        <Form action="" className="d-grid gap-4">
          <Form.Group className="mb-0" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="input your account number"
            />
          </Form.Group>
          <InputGroup className="mb-4 ">
            <Form.Control
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              type="file"
            />
            <InputGroup.Text id="basic-addon1">
              <img src={icons1} alt="" />
            </InputGroup.Text>
          </InputGroup>
          <Button
            variant="danger"
            size="lg"
            onClick={(e) => handleBuy.mutate()}
          >
            Kirim
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Payment;
