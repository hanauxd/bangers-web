import React from "react";

import { BookingHistoryItem } from "../../index";

const BookingHistoryList = props => {
    const bookings = props.bookings;

    return bookings.map(item => (
        <BookingHistoryItem key={item.id} item={item} />
    ));
};

export default BookingHistoryList;
