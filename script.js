   (function() {
            // ========== DOM ELEMENTS ==========
            const splashScreen = document.getElementById('splashScreen');
            const loginScreen = document.getElementById('loginScreen');
            const passwordScreen = document.getElementById('passwordScreen');
            const homeScreen = document.getElementById('homeScreen');

            // Login elements
            const phoneInput = document.getElementById('phoneInput');
            const nextBtn = document.getElementById('nextBtn');
            const loginError = document.getElementById('loginError');
            const loginErrorText = document.getElementById('loginErrorText');
            const loginBackBtn = document.getElementById('loginBackBtn');

            // Password elements
            const passwordInput = document.getElementById('passwordInput');
            const loginBtn = document.getElementById('loginBtn');
            const passwordError = document.getElementById('passwordError');
            const passwordErrorText = document.getElementById('passwordErrorText');
            const passwordBackBtn = document.getElementById('passwordBackBtn');
            const displayPhone = document.getElementById('displayPhone');
            const keypad = document.getElementById('keypad');

            // Home elements
            const toggleBalanceIcon = document.getElementById('toggleBalanceIcon');
            const balanceDisplay = document.getElementById('balanceDisplay');
            const addMoneyBtn = document.getElementById('addMoneyBtn');

            // ========== CREDENTIALS ==========
            const VALID_PHONE = '0808080';
            const VALID_PASSWORD = '000000';

            // ========== STATE ==========
            let isBalanceVisible = true;
            const balanceAmount = '₦ 20,545,890.50';

            // ========== SPLASH SCREEN TIMER (3 seconds) ==========
            setTimeout(() => {
                splashScreen.classList.add('hidden');
                loginScreen.classList.remove('hidden');
            }, 3000);

            // ========== HELPER: Format phone for display ==========
            function formatPhone(phone) {
                // Format: 0808 8923 044
                const cleaned = phone.replace(/\D/g, '');
                if (cleaned.length === 10) {
                    return cleaned.slice(0, 4) + ' ' + cleaned.slice(4, 7) + ' ' + cleaned.slice(7);
                }
                return phone;
            }

            // ========== LOGIN SCREEN: NEXT BUTTON ==========
            nextBtn.addEventListener('click', () => {
                const phone = phoneInput.value.trim().replace(/\D/g, '');

                if (!phone) {
                    showLoginError('Please enter your mobile number');
                    return;
                }

                if (phone !== VALID_PHONE) {
                    showLoginError('Invalid phone number. Please try again.');
                    return;
                }

                // Valid phone -> go to password screen
                hideLoginError();
                displayPhone.textContent = formatPhone(phone);
                loginScreen.classList.add('hidden');
                passwordScreen.classList.remove('hidden');
                passwordInput.value = '';
                passwordInput.focus();
                updateLoginButtonState();
                hidePasswordError();
            });

            // Allow Enter key on phone input
            phoneInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    nextBtn.click();
                }
            });

            // ========== PASSWORD SCREEN ==========
            // Enable/disable login button based on input length
            function updateLoginButtonState() {
                const val = passwordInput.value.trim();
                loginBtn.disabled = val.length !== 6;
            }

            // Handle keypad clicks
            keypad.addEventListener('click', (e) => {
                const btn = e.target.closest('button');
                if (!btn) return;

                const key = btn.dataset.key;
                if (!key) return;

                if (key === 'delete') {
                    passwordInput.value = passwordInput.value.slice(0, -1);
                } else {
                    if (passwordInput.value.length < 6) {
                        passwordInput.value += key;
                    }
                }
                updateLoginButtonState();
                hidePasswordError();
            });

            // Allow typing on password input directly
            passwordInput.addEventListener('input', (e) => {
                // Only allow digits
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 6);
                updateLoginButtonState();
                hidePasswordError();
            });

            // Login button click
            loginBtn.addEventListener('click', () => {
                const password = passwordInput.value.trim();

                if (password !== VALID_PASSWORD) {
                    showPasswordError('Incorrect password. Please try again.');
                    passwordInput.value = '';
                    updateLoginButtonState();
                    return;
                }

                // Successful login
                hidePasswordError();
                passwordScreen.classList.add('hidden');
                homeScreen.classList.remove('hidden');

                // Reset balance visibility on login
                isBalanceVisible = true;
                balanceDisplay.textContent = balanceAmount;
                balanceDisplay.classList.remove('blur-balance');
                toggleBalanceIcon.className = 'fas fa-eye-slash';
            });

            // Allow Enter key on password input
            passwordInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    loginBtn.click();
                }
            });

            // ========== ERROR HELPERS ==========
            function showLoginError(msg) {
                loginErrorText.textContent = msg;
                loginError.classList.remove('hidden');
                clearTimeout(window.loginErrorTimeout);
                window.loginErrorTimeout = setTimeout(() => {
                    loginError.classList.add('hidden');
                }, 3000);
            }

            function hideLoginError() {
                loginError.classList.add('hidden');
                clearTimeout(window.loginErrorTimeout);
            }

            function showPasswordError(msg) {
                passwordErrorText.textContent = msg;
                passwordError.classList.remove('hidden');
                clearTimeout(window.passwordErrorTimeout);
                window.passwordErrorTimeout = setTimeout(() => {
                    passwordError.classList.add('hidden');
                }, 3000);
            }

            function hidePasswordError() {
                passwordError.classList.add('hidden');
                clearTimeout(window.passwordErrorTimeout);
            }

            // ========== BACK BUTTONS ==========
            loginBackBtn.addEventListener('click', () => {
                // No previous screen (splash already gone), just clear
                phoneInput.value = '';
                hideLoginError();
            });

            passwordBackBtn.addEventListener('click', () => {
                passwordScreen.classList.add('hidden');
                loginScreen.classList.remove('hidden');
                passwordInput.value = '';
                hidePasswordError();
                hideLoginError();
            });

            // ========== HOME SCREEN: TOGGLE BALANCE ==========
            toggleBalanceIcon.addEventListener('click', () => {
                if (isBalanceVisible) {
                    balanceDisplay.textContent = ' *****';
                    toggleBalanceIcon.className = 'fas fa-eye';
                    isBalanceVisible = false;
                } else {
                    balanceDisplay.textContent = balanceAmount;
                    toggleBalanceIcon.className = 'fas fa-eye-slash';
                    isBalanceVisible = true;
                }
            });

            // ========== HOME SCREEN: ADD MONEY (DEMO) ==========
            addMoneyBtn.addEventListener('click', () => {
                alert('Demo: Add Money screen would open here.');
            });

            // ========== HOME SCREEN: QUICK ACTION & SERVICE CLICKS (DEMO) ==========
            document.querySelectorAll('.quick-action-item').forEach(item => {
                item.addEventListener('click', () => {
                    const label = item.querySelector('span')?.innerText || 'Action';
                    alert(`Demo: ${label} feature.`);
                });
            });

            document.querySelectorAll('.service-item').forEach(item => {
                item.addEventListener('click', () => {
                    const label = item.querySelector('span')?.innerText || 'Service';
                    alert(`Demo: ${label} service.`);
                });
            });

            // Bottom nav
            document.querySelectorAll('.nav-item').forEach(item => {
                item.addEventListener('click', function() {
                    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
                    this.classList.add('active');
                });
            });

            // Promo button
            document.querySelector('.promo-btn')?.addEventListener('click', () => {
                alert('Demo: Fixed Savings promo.');
            });

            // Share button
            document.querySelector('.share-btn')?.addEventListener('click', () => {
                alert('Demo: Share OPay with others.');
            });

            // ========== INITIAL SETUP ==========
            // Clear input on load
            window.addEventListener('load', () => {
                phoneInput.value = '';
                passwordInput.value = '';
                hideLoginError();
                hidePasswordError();
                updateLoginButtonState();
            });

        })();
