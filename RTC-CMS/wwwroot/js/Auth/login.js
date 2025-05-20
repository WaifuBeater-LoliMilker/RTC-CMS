window.addEventListener('DOMContentLoaded', event => {
    const form = document.getElementById('form_login')
    const errorText = document.getElementsByClassName('text-error')[0]
    const showPass = document.getElementsByClassName('show-password')[0]

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        errorText.textContent = '';
        const formData = new FormData(form);
        const data = new URLSearchParams(formData);
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            if (response.ok) {
                window.location.href = '/home';
            } else {
                const message = await response.text();
                errorText.textContent = message || 'Đã có lỗi xảy ra, vui lòng thử lại'
            }
        }
        catch (err) {
            console.log(err)
            errorText.textContent = 'Đã có lỗi xảy ra, vui lòng thử lại';
        }
    })
    showPass.addEventListener('click', function (e) {
        e.preventDefault();
        const pwInput = document.getElementById('password');
        const pwBtn = showPass.getElementsByTagName('i')[0];
        if (pwInput.type == 'password') {
            pwInput.type = 'text';
            pwBtn.className = 'fa-solid fa-eye-slash'
        } else {
            pwInput.type = 'password';
            pwBtn.className = 'fa-solid fa-eye'
        }
    })
});
