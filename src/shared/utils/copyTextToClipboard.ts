const copyTextToClipboard = (text: string) => {
    // 텍스트를 복사할 임시 textarea 엘리먼트 생성
    const textarea = document.createElement('textarea');
    textarea.value = text;

    // textarea를 display: none으로 숨기고 body에 추가
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);

    // textarea 선택 및 복사 실행
    textarea.focus();
    textarea.select();

    // 복사 명령 실행
    const successful = document.execCommand('copy');
    if (successful) {
        console.log('텍스트가 클립보드에 복사되었습니다.');
        return true;
    } else {
        console.error('텍스트 복사에 실패하였습니다.');
        return false;
    }

    // textarea 제거
    document.body.removeChild(textarea);
}

export default copyTextToClipboard;