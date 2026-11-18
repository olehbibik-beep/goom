(() => {
    const dialog = document.getElementById('feedbackDialog');
    const form = document.getElementById('feedbackForm');
    const message = document.getElementById('feedbackMessage');
    const status = document.getElementById('feedbackStatus');
    const send = document.getElementById('btnFeedbackSend');
    const close = document.getElementById('btnFeedbackClose');
    const compose = document.getElementById('feedbackCompose');
    const success = document.getElementById('feedbackSuccess');
    let senderUid;
    let sending = false;

    function resetConfirmation() {
        compose.hidden = false;
        success.hidden = true;
    }

    function showStatus(text, error = false) {
        status.textContent = tr(text);
        status.dataset.error = String(error);
        status.hidden = !text;
    }

    function updateSender() {
        const user = window.getFirebaseUser();
        if (senderUid !== user?.uid) {
            message.value = '';
            senderUid = user?.uid;
            showStatus('');
            resetConfirmation();
        }
        const enabled = Boolean(user?.email && user.emailVerified);
        message.disabled = sending || !enabled;
        send.disabled = sending || !enabled;
        close.disabled = sending;
        if (!enabled) showStatus('Pro odeslání zprávy se přihlaste s ověřeným e-mailem.', true);
    }

    document.getElementById('btnOpenFeedback').addEventListener('click', () => {
        if (!success.hidden) {
            resetConfirmation();
            showStatus('');
        }
        updateSender();
        dialog.showModal();
    });
    close.addEventListener('click', () => dialog.close());
    document.getElementById('btnFeedbackDone').addEventListener('click', () => dialog.close());
    dialog.addEventListener('cancel', event => { if (sending) event.preventDefault(); });
    dialog.addEventListener('keydown', event => event.stopPropagation());
    message.addEventListener('input', () => showStatus(''));
    document.addEventListener('goom-account-changed', () => { if (dialog.open) updateSender(); });

    form.addEventListener('submit', async event => {
        event.preventDefault();
        const text = message.value.trim();
        const user = window.getFirebaseUser();
        if (sending || !user?.email || !user.emailVerified) return;
        if (!text) {
            showStatus('Napište zprávu.', true);
            message.focus();
            return;
        }
        sending = true;
        updateSender();
        showStatus('Odesílám zprávu…');
        try {
            const [db, token] = await Promise.all([window.getFirebaseDatabase(), user.getIdTokenResult()]);
            if (window.getFirebaseUser()?.uid !== user.uid) return;
            const sender = db.collection('goomFeedbackSenders').doc(user.uid);
            const entry = db.collection('goomFeedback').doc();
            await db.runTransaction(async transaction => {
                const last = (await transaction.get(sender)).data()?.sentAt?.toMillis();
                if (last && Date.now() - last < 30_000) throw new Error('feedback-cooldown');
                const sentAt = firebase.firestore.FieldValue.serverTimestamp();
                transaction.set(entry, { uid: user.uid, email: user.email, name: token.claims.name || '',
                    application: APP_PRODUCT, message: text, sentAt });
                transaction.set(sender, { messageId: entry.id, sentAt });
            });
            if (window.getFirebaseUser()?.uid !== user.uid) return;
            message.value = '';
            showStatus('');
            compose.hidden = true;
            success.hidden = false;
            document.getElementById('btnFeedbackDone').focus();
        } catch (error) {
            if (window.getFirebaseUser()?.uid !== user.uid) return;
            showStatus(error.message === 'feedback-cooldown'
                ? 'Před další zprávou počkejte 30 sekund.' : 'Zprávu se nepodařilo odeslat. Zkuste to znovu.', true);
        } finally {
            sending = false;
            updateSender();
        }
    });
})();
