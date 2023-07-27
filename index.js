'use strict';

const info_url = "/maintenance_reason.json";

function getMaintenanceInfo() {
    
}

{
    const reasonDom = document.getElementById("reason");

    const a = fetch(info_url)
    .then((res) => {return res.json()})
    .then((res) => {
        console.log(res);

        const reason = res['reason'];
        const schedule = res['schedule'];

        if (reason === "") {
            console.log("Show default message because reason is empty");
        } else if (reason === "functional") {
            document.getElementById('default').hidden = true;
            reasonDom.textContent = "현재 서비스가 작동 중입니다.";
            reasonDom.innerHTML += '<br><a href="https://k.lapy.link">되돌아가기</a>'
        } else if (reason === "update") {
            const version = res['version'];
            
            document.getElementById('default').hidden = true;
            document.getElementById('update').hidden = false;

            if (version !== "") {
                document.getElementById('misskey-version').textContent = version + "으로"
            }
        } else if (reason === "maintenance") {
            document.getElementById('default').hidden = true;
            reasonDom.textContent = "Misskey.lapy의 시스템을 점검 중입니다.";
        } else if (reason === "urgent") {
            document.getElementById('default').hidden = true;
            reasonDom.textContent = "Misskey.lapy의 시스템을 긴급 점검 중입니다.";
        } else {
            reasonDom.textContent = res['reason'];
        }

        if(schedule !== "") {
            document.getElementById('schedule').textContent = "일시: " + schedule;
        }
    });

}
