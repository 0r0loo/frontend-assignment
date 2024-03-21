export function jsx(type, props, ...children) {
  return {
    type,
    props: props || {},
    children: [...children]
  };
}

export function createElement(node) {
  // TODO node 의 type 이 문자열이 아닌것도 대응

  // jsx를 dom으로 변환
  const element = document.createElement(node.type);
  for (const key in node.props) {
    if (key === 'class') {
      // TODO: 스타일드 컴포넌트 같은 경우도 있어서 class 추가하는게 더 나을듯
      element.classList.add(node.props[key]);
    }
    element.setAttribute(key, node.props[key]);
  }

  for (const child of node.children) {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(createElement(child));
    }
  }
  return element;
}
function updateAttributes(target, newProps, oldProps) {
  // newProps 들을 반복하여 각 속성과 값을 확인
  //   만약 oldProps 에 같은 속성이 있고 값이 동일하다면
  //     다음 속성으로 넘어감 (변경 불필요)
  //   만약 위 조건에 해당하지 않는다면 (속성값이 다르거나 구속성에 없음)
  //     target 에 해당 속성을 새 값으로 설정
  for (const key in newProps) {
    if (newProps[key] !== oldProps[key]) {
      target.setAttribute(key, newProps[key]);
    }
  }

  // oldProps 을 반복하여 각 속성 확인
  //   만약 newProps 들에 해당 속성이 존재한다면
  //     다음 속성으로 넘어감 (속성 유지 필요)
  //   만약 newProps 들에 해당 속성이 존재하지 않는다면
  //     target 에서 해당 속성을 제거
  for (const key in oldProps) {
    if (newProps[key]) {
      continue;
    }
    target.removeAttribute(key);
  }
}

export function render(parent, newNode, oldNode, index = 0) {
  // 1. 만약 newNode 가 없고 oldNode 만 있다면
  //   parent 에서 oldNode 를 제거
  //   종료
  if (!newNode && oldNode) {
    parent.removeChild(parent.childNodes[index]);
    return;
  }

  // 2. 만약 newNode 가 있고 oldNode 가 없다면
  //   newNode를 생성하여 parent에 추가
  //   종료
  if (newNode && !oldNode) {
    parent.appendChild(createElement(newNode));
    return;
  }

  // 3. 만약 newNode와 oldNode 둘 다 문자열이고 서로 다르다면
  //   oldNode를 newNode로 교체
  //   종료

  if (typeof newNode !== 'object' && typeof oldNode !== 'object') {
    if (newNode !== oldNode) {
      parent.replaceChild(createElement(newNode), parent.childNodes[index]);
    }
    return;
  }

  // 4. 만약 newNode와 oldNode의 타입이 다르다면
  //   oldNode를 newNode로 교체
  //   종료
  if (newNode.type !== oldNode.type) {
    parent.replaceChild(createElement(newNode), parent.childNodes[index]);
    return;
  }

  // 5. newNode와 oldNode에 대해 updateAttributes 실행
  updateAttributes(parent.childNodes[index], newNode.props, oldNode.props);

  // 6. newNode와 oldNode 자식노드들 중 더 긴 길이를 가진 것을 기준으로 반복
  //   각 자식노드에 대해 재귀적으로 render 함수 호출
  const length = Math.max(newNode.children.length, oldNode.children.length);
  for (let i = 0; i < length; i++) {
    render(
      parent.childNodes[index],
      newNode.children[i],
      oldNode.children[i],
      i
    );
  }
}
