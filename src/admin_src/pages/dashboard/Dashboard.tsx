import { FaSearch } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import "./dashboard.scss";
import { useRef } from "react";
import WidgetBox from "../../components/widgetbox/WidgetBox";
// import ProductComponent from "../../components/productcomponent/ProductComponent";
import { BarChart, DoughnutChart } from "../../components/charts/Charts";

function Dashboard() {
  const searchRef = useRef<HTMLInputElement>(null);
  function serachFocus() {
    if (searchRef.current != null) {
      // 👉️ TypeScript knows that ref is not null here
      searchRef.current.focus();
    }
  }
  return (
    <div className="dashboard">
      {/* TopBar */}
      <section className="topbar">
        <FaSearch className="searchicon" onClick={serachFocus} />
        <input
          type="text"
          placeholder="Search for data users docs"
          ref={searchRef}
        />
        <IoIosNotifications />
        <FaUserCircle />
      </section>
      {/* Topbar End */}

      {/* WidgetBox Container */}
      <section className="widgetbox-container">
        <WidgetBox
          name="Revenue"
          value={3659900}
          amount={true}
          percentage={25}
          color="skyblue"
        />

        <WidgetBox
          name="Users"
          value={400}
          amount={false}
          percentage={-14}
          color="rgb(5, 221, 145)"
        />

        <WidgetBox
          name="Transactions"
          value={2600}
          amount={false}
          percentage={80}
          color="#FF5733 "
        />

        <WidgetBox
          name="Revenue"
          value={100}
          amount={false}
          percentage={100}
          color="orange"
        />
      </section>

      {/* WidgetBox Container End */}

      {/* Revenue and inventory sections */}

      <section className="graph-container">
        <div className="left">
          <div className="revenue">
            <h5>Revenue and Transaction</h5>
            {/* Provide values for barchart */}
            <BarChart
              title="Revenue"
              bar_data={[10, 20, 30]}
              bgcolor="skyblue"
            />
            <BarChart
              title="Transacctions"
              bar_data={[4, 3, 9]}
              bgcolor="pink"
            />
          </div>
        </div>

        <div className="right">
          <div className="inventory">
            <h5>Inventory</h5>
            <div className="product-list">
              {/* {clothData.products.map((clothItem) => {
                return (
                  <ProductComponent
                    name={clothItem.name}
                    percent={clothItem.quantity}
                  />
                );
              })} */}
            </div>
          </div>

          <div className="gender-chart-container">
            <div className="gender-chart">
              <p>Gender Ratio</p>
              <DoughnutChart
                title="Count"
                doghnut_data={[20, 40]}
                labels={["Male", "Female"]}
                colors={["skyblue", "pink"]}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
