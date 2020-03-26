import * as moment from "moment";

export const formatDate = date => {
    return moment
        .utc(date)
        .local()
        .format("DD MMMM YYYY, h:mm A");
};
