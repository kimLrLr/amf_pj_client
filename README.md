### FindAccount 정리해보기..

만약에 ID찾기를 클릭했을 경우,handleFindID 핸들러가 동작하고, setIsFindingID값이 true, 반대로 setIsResettingPW값이 false가 되고, PW 재설정 버튼을 클릭한 경우에는 위와 반대로 true와 false값이 들어가게 된다.

처음 계정 찾기 페이지로 갔을 때는, 두 값 모두 false를 주어 버튼을 누르게 되는 값에 true를 주는 식으로??!

=> 만약 ID찾기에서 이름을 입력하고 "ID찾기"를 누르는 경우, findIdHandler 동작하여 id 정보를 가져와 보여주고,
=> PW 재설정을 누르는 경우, resettingPwHandler가 동작하여 ResetPassword페이지로 이동할 수 있는 링크가 담긴 메일을 발송하고, 사용자는 링크를 타고 들어오면 비밀번호를 재생성 할 수 있도록 설정

-> 제대로 재생성이 되었다면, "비밀번호가 정상적으로 변경되었습니다." 문구와 함께 로그인 페이지로 이동 버튼 넣으면 괜찮을 것 같기도함!
