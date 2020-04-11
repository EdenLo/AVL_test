const sendMailButton = document.querySelector('.sendMail');

sendMailButton.addEventListener('click', e => {
    Swal.fire({
        title: 'Sending .......',
        onBeforeOpen: () => {
            Swal.showLoading()
            const topic = e.target.form.topic.value;
            const content = e.target.form.content.value;
            Email.send({
                SecureToken: mailConstant.SECURE_TOCKEN,
                To: mailConstant.TO,
                From: mailConstant.FROM,
                Subject: topic,
                Body: content
            }).then(() => {
                Swal.getTitle().textContent = 'Your message is sent!';
                Swal.hideLoading();
                clearMail(e);
            });
        }
    });
});

const mailConstant = {
    SECURE_TOCKEN: '027ea83f-c40f-41a0-97d2-8bde76b4f5d5',
    FROM: 'arenabanking@gmail.com',
    TO: 'hr@avancevl.com'
}

function clearMail(e) {
    e.target.form.topic.value = '';
    e.target.form.content.value = '';
}
