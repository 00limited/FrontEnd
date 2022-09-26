import { Dropdown, Table, ButtonGroup } from "react-bootstrap";
import img from "../iconPro/Polygon 2.png";
import dataPayment from "../../fakeData/dataPayment.json";
import { useQuery } from "react-query";
import { API } from "../../config/api";

function Userpayment() {
  let { data: payment } = useQuery("paymentCache", async () => {
    const response = await API.get("/transaction");
    return response.data.data;
  });

  console.log(payment);

  return (
    <div className="" style={{ background: "black" }}>
      <div
        className="d-flex justify-content-center pb-5"
        style={{ background: "black" }}
      >
        <div className="bg-dark" style={{ width: "80%" }}>
          <div className="" style={{ background: "black" }}>
            <h3 className="text-light mb-4 p-4">Incoming Transsaction</h3>
          </div>
          <Table striped="columns">
            <thead>
              <tr className="text-danger">
                <th>No</th>
                <th className="text-danger">Users</th>
                <th className="text-danger">Remaining Active</th>
                <th className="text-danger">Status Payment</th>
                <th>Attace</th>
              </tr>
            </thead>
            <tbody>
              {payment?.map((data) => {
                return (
                  <tr className="text-light">
                    <td>{data.id}</td>
                    <td className="text-light">{data?.user?.fullname}</td>
                    <td className="text-light">{data?.timeEnd} Hari</td>
                    <td
                      className={
                        data?.status == "success"
                          ? "text-success"
                          : data?.status == "pending"
                          ? "text-warning"
                          : "text-danger"
                      }
                    >
                      {data?.status}
                    </td>
                    <td className="text-primary">{data?.attache}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Userpayment;
