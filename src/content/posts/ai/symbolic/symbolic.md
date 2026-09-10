---
title: "기호추론(SR) 이론"
date: "2026-09-10"
subject: "Symbolic AI"
readTime: "06 MIN READ"
description: "Symbolic AI(SR) 이론"
---

1단계: 관계형 논리 프로그래밍 (core.logic / miniKanren)함수를 일방향 계산이 아닌 양방향 다대다 관계(Relation)로 정의하여, 
출력으로부터 입력을 역산하고 식을 완성하는 논리 프로그래밍 체계를 완성합니다.
1.1 논리 변수와 스코프: fresh를 통한 미지수 변수 선언과 run*, run n 결과 수집 메커니즘
1.2 단일화 연산자 (==): Robinson 단일화의 프로덕션 구현체 동작 원리와 상태 치환 맵 관리
1.3 논리 결합자: 논리곱(암시적 AND)과 논리합(conde 분기)을 이용한 비결정론적 다중 해 탐색
1.4 기본 리스트 관계: conso, firsto, resto, emptyo를 활용한 리스트 구조 분해 및 역생성
1.5 양방향 리스트 결합 (appendo): 순방향 연결, 역방향 분할, 특정 패턴을 만드는 모든 조합 역산
1.6 재귀 관계 추론 (membero): 무한 재귀 방지 및 깊이 우선/너비 우선 탐색 스트림 인터리빙
1.7 비-단일화 제약 (!=): Disequality Constraint를 이용한 부정 제약 및 가지치기
1.8 관계형 산술 및 수식 파서: 미지수가 포함된 수식을 거꾸로 풀어내는 역산 인터프리터 구현
1.9 [미니 프로젝트]: 관계형 AST 기반 양방향 SQL $\leftrightarrow$ Clojure 데이터 질의 생성기

2단계: 엔터프라이즈 룰 엔진 & RETE 알고리즘 (clara-rules)수만 개의 비즈니스 규칙과 사실(Fact)이 실시간으로 유입될 때 $O(1) \sim O(\log N)$으로 패턴을 매칭하는 RETE 네트워크 
엔진을 구축합니다.
2.1 Fact 모델링: defrecord를 이용한 불변 스키마 정의 및 세션(mk-session) 초기화
2.2 규칙 및 질의 정의: defrule, defquery의 기본 구조와 LHS(조건) / RHS(동작) 분리
2.3 RETE 네트워크 아키텍처: Type Node, Alpha Node(단일 조건), Beta Node(조인 메모리)의 내부 구조
2.4 불리언 조건 조합: [:and ...], [:or ...], [:not ...]를 활용한 복합 조건 바인딩
2.5 진실 유지 시스템 (TMS): 전제 조건 Fact가 삭제/수정될 때 파생된 지식을 자동 롤백하는 메커니즘
2.6 누적 연산자 (Accumulators): acc/all, acc/count, acc/sum, acc/min-by를 통한 집계 추론
2.7 세션 상태 전파: Fact 삽입(insert, insert-all), 세션 점진적 평가(fire-rules), 결과 추출(query)
2.8 규칙 충돌 해결 (Salience & Priority): 규칙 발화 순서 제어와 무한 루프 차단 전략
2.9 복합 이벤트 처리 (CEP) 패턴: 시간차 이벤트 스트림 및 유한 상태 머신(FSM) 추론
2.10 [미니 프로젝트]: 실시간 이상금융거래 탐지 시스템(FDS) 및 다조건 동적 프로모션 엔진

3단계: 지식 베이스와 Datalog 그래프 추론 (DataScript)엔티티-속성-값-시간(EAVT) 기반의 인메모리 불변 데이터베이스를 통해 지식 그래프 상의 다단계(Multi-hop) 관계를 질의하고 추론합니다.
3.1 EAVT 모델: Entity-Attribute-Value-Tx 4원조 데이터 구조와 트리플(Triple) 저장소 원리
3.2 스키마 정의: :db/cardinality (one/many), :db/valueType, :db/unique 제약 설정
3.3 불변 트랜잭션: d/transact!를 통한 지식 그래프 구축 및 시점(Point-in-time) 스냅샷 조회
3.4 Datalog 패턴 매칭: [:find ?e ?v :where ...] 질의의 기본 구조와 패턴 조인
3.5 동적 파라미터 바인딩: :in 절을 활용한 컬렉션, 튜플, 외부 함수 주입 질의
3.6 변환 및 조건 필터: :where 절 내부의 Clojure 순수 함수 호출 및 조건 검증
3.7 재귀 Datalog 규칙 (:rules): 그래프 내 도달 가능성(Reachability) 및 순환 탐색
3.8 인덱스 아키텍처: EAVT, AEVT, AVET, VAE 인덱스 구조와 그래프 역방향 탐색 최적화
3.9 Pull API와 엔티티 내비게이션: 지식 그래프 상의 복합 관계를 계층형 트리로 탐색 및 직렬화
3.10 [미니 프로젝트]: 기업 조직도 및 리소스 기반 다단계 RBAC / ABAC 접근 권한 추론 엔진

4단계: 유한 도메인 제약 만족(CLP(FD)) & SMT 검증 (core.logic.fd & SMT)참/거짓 매칭을 넘어 숫자, 일정, 자원 범위의 수학적 제약조건을 전파(Constraint Propagation)하고 
정식 검증(Formal Verification)합니다.
4.1 CLP(FD) 개요: 유한 도메인(Finite Domain) 제약 논리 프로그래밍의 수학적 원리
4.2 도메인 바인딩: fd/in, fd/interval을 이용한 정수 및 이산 도메인 정의
4.3 수치/비교 제약 연산자: fd/+, fd/-, fd/*, fd/<, fd/==, fd/!= 제약 설정
4.4 제약 전파(Constraint Propagation): 아크 일관성(Arc Consistency / AC-3) 알고리즘 분석
4.5 전역 제약조건 (fd/distinct): All-Different 제약을 이용한 자원 독점 문제의 효율적 가지치기
4.6 탐색 전략 및 휴리스틱: Branch and Bound, First-Fail 휴리스틱을 통한 최적화 가속
4.7 SMT(Satisfiability Modulo Theories) 연동: Java Interop을 이용한 Z3 SMT 솔버 브릿지 구축
4.8 SMT-LIB 수식 변환: 복합 논리 명제를 1차 술어 논리 및 비트벡터/선형 산술 공식으로 번역
4.9 Bucket Elimination (MBE): 변수 순서 결정(Elimination Ordering)을 통한 대규모 CSP 축소
4.10 [미니 프로젝트]: MSA 기반 멀티 클라우드 리소스 및 컨테이너 최적 배치 스케줄러

5단계: 인과 구조 모델(SCM) & 위상학적 지식 필터링단순 상관관계를 넘어선 인과관계($do$-calculus) 분석, 반사실적 설명 생성 및 고차원 그래프 위상(Topology) 정제를 수행합니다.
5.1 인과 다이어그램 (Causal DAG): loom 라이브러리를 활용한 인과 방향성 그래프 모델링
5.2 $d$-분리($d$-separation): 체인, 포크, 콜라이더 구조에서의 조건부 독립성 자동 판정
5.3 펄(Pearl)의 개입 연산 ($do$-calculus): 관찰 데이터와 개입(Intervention)의 수식적 차이 구현
5.4 구조적 인과 모델 (SCM): 구조 방정식(Structural Equations)과 외생 변수($U$) 결합
5.5 반사실 추론 1단계 (Abduction): 관측된 증상으로부터 미관측 배경 변수($U$)의 사후 상태 역추정
5.6 반사실 추론 2~3단계 (Action & Prediction): 개입 서브그래프 수정 및 반사실적 결과 예측
5.7 지식 그래프의 단순 복합체 변환: 노드(0-Simplex), 간선(1-Simplex), 삼각 루프(2-Simplex) 추출
5.8 위상 지지도(Topological Coherence): 자카드 중첩률과 삼각 폐쇄(Triadic Closure) 기반 가중치 수식화
5.9 지속성 분석(Persistence)과 노이즈 필터: 다단계 추론 경로 중 허위 연관성(Spurious Path) 자동 제거
5.10 [통합 캡스톤 프로젝트]: 분산 시스템 장애 근본 원인(RCA) 진단 + 위상 필터링 하이브리드 엔진