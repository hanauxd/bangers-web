import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdbreact";

const FleetComparison = (props) => {
    const { fleet } = props;

    const rows = fleet.map((element, index) => {
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{element.vehicle}</td>
                <td>{element.ourRate}</td>
                <td>{element.externalRate}</td>
            </tr>
        );
    });

    return (
        <div style={{ maxWidth: "1000px", margin: "2% auto" }}>
            <h3>Fleet Comparison</h3>
            <hr />
            <MDBTable hover>
                <MDBTableHead color="mdb-color darken-3" textWhite>
                    <tr>
                        <th>#</th>
                        <th>Vehicle</th>
                        <th>Our Rate</th>
                        <th>External Rate</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>{rows}</MDBTableBody>
            </MDBTable>
        </div>
    );
};

export default FleetComparison;
