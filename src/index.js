import app from "./app";

//Tutorial: https://www.youtube.com/watch?v=dkic3MU3858&t=236s&ab_channel=UskoKruM2010

const main=() => {
    app.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")}`)

};

main();