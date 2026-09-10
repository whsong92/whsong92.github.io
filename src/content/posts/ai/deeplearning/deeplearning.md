---
title: "Deep learning(DL) 이론"
date: "2026-09-10"
subject: "Deep learning"
readTime: "06 MIN READ"
description: "Deep learning(DL) 이론"
---
**밑바닥 텐서 연산 엔진부터 현대 거대 언어 모델(LLM)의 아키텍처, 사전학습, 정렬, 추론 시스템을 관통하는 딥러닝 & LLM 마스터 커리큘럼**을 재설계했습니다.

# 딥러닝 & LLM 심화 마스터 커리큘럼 (50단계)

```
[1단계: 텐서 엔진 & 딥러닝 수학적 코어] (Tensor Engine & Autograd from Scratch)
       │
       ▼
[2단계: 토큰화 & 현대 트랜스포머 아키텍처 해체] (Modern Transformer Architecture)
       │
       ▼
[3단계: LLM 사전학습 & 자기회귀 생성 엔진] (Pre-training & Autoregressive Engine)
       │
       ▼
[4단계: 파라미터 효율적 튜닝(PEFT) & 모델 정렬] (Fine-Tuning & Alignment / RLHF / DPO)
       │
       ▼
[5단계: LLM 시스템 최적화 & 고급 추론 엔지니어링] (Inference Systems & Advanced Reasoning)

```

### 1단계: 텐서 엔진 & 딥러닝 수학적 코어 (Tensor Engine & Autograd from Scratch)

프레임워크의 고수준 API에 의존하지 않고, 물리적 메모리 레이아웃부터 역전파 미분 엔진, 수치 안정성, 가중치 최적화의 수학적 원리를 바닥부터 구현합니다.

* **1.1 텐서 메모리 아키텍처:** 1D 연속 메모리 블록, Strides, Storage Offset, 그리고 `view` vs `reshape` vs `transpose`의 물리적 포인터 연산 메커니즘
* **1.2 Autograd 엔진 해체:** 연쇄 법칙(Chain Rule)과 VJP(Vector-Jacobian Product)의 수학적 원리, 동적 계산 그래프(DAG) 노드 및 커스텀 `torch.autograd.Function` 구현
* **1.3 가중치 초기화와 분산 보존:** 순전파/역전파 시 분산 폭발·소멸 방지를 위한 Xavier(Glorot) 및 Kaiming(He) 정규/균등 분포 초기화 수식 증명과 구현
* **1.4 활성화 함수와 기울기 흐름:** ReLU의 Dying 노드 문제, Sigmoid/Tanh의 포화 현상 분석, GELU(Gaussian Error Linear Unit) 및 SiLU/Swish의 비선형 곡률 수식화
* **1.5 손실 함수와 수치 안정성:** CrossEntropyLoss 내부의 `LogSumExp` 트릭(Underflow/Overflow 방지), Label Smoothing, Focal Loss 밑바닥 구현
* **1.6 1차/2차 모멘텀 옵티마이저:** 경사하강법(SGD)부터 모멘텀, RMSprop, 그리고 $L_2$ 정규화와 Decoupled Weight Decay의 수학적 차이를 적용한 AdamW 직접 구현
* **1.7 학습 안정화 기법:** 그래디언트 폭주를 막는 $L_2$ Norm 기반 Gradient Clipping, Warmup이 결합된 Cosine Annealing Learning Rate Scheduler 구현
* **1.8 정규화 계층(Normalization) 해체:** 데이터 텐서 축(Batch, Channel, Sequence, Feature)에 따른 BatchNorm, LayerNorm, GroupNorm, RMSNorm의 수식 및 연산 축 비교
* **1.9 확률적 정규화와 일반화:** Inverted Dropout의 스케일링 계수($\frac{1}{1-p}$) 원리 및 Residual 연결에서의 DropPath(Stochastic Depth) 구현
* **1.10 [미니 프로젝트]:** 외부 라이브러리 Autograd를 일체 배제하고, 순수 텐서 연산과 DAG 기반 역전파로 동작하는 **Micro-Autograd 딥러닝 엔진** 구축

### 2단계: 토큰화 & 현대 트랜스포머 아키텍처 해체 (Modern Transformer Architecture)

문자열을 다루는 서브워드 토크나이저부터 최신 LLaMA 3, Mistral, Gemma의 표준 뼈대(RoPE, SwiGLU, GQA, RMSNorm)를 밑바닥부터 조립합니다.

* **2.1 서브워드 토큰화 (BPE):** 바이트 페어 인코딩(Byte-Pair Encoding) 및 Byte-level BPE 알고리즘의 통계적 병합(Merge Rules)과 어휘 사전(Vocabulary) 빌더 구현
* **2.2 어휘 임베딩과 가중치 공유:** Lookup Table 메모리 동작 원리, Scaled Embedding, Input-Output Weight Tying(가중치 공유) 메커니즘
* **2.3 위치 인코딩의 발전사:** 절대 위치 인코딩(Sinusoidal vs Learned)의 한계와 상대 위치 인코딩(T5 Relative, ALiBi)의 수식 분석
* **2.4 회전 위치 임베딩 (RoPE):** Rotary Position Embedding의 복소 평면 2D 회전 변환 수식 유도, 주파수($\theta$) 텐서 계산 및 복소수 곱셈 구현
* **2.5 Scaled Dot-Product Attention:** $Q, K, V$ 행렬 분해, $\sqrt{d_k}$ 스케일링 팩터의 분산 정규화 증명, Softmax 수치 최적화
* **2.6 현대적 어텐션 변형 (GQA / MQA):** Multi-Head Attention(MHA)의 메모리 병목 분석 및 KV 헤드를 그룹화하는 Grouped-Query Attention(GQA) 텐서 브로드캐스팅 구현
* **2.7 활성화 함수 고도화 (SwiGLU):** Gated Linear Unit(GLU)의 요소별 게이팅(Hadamard Product) 메커니즘과 LLaMA 표준 SwiGLU FFN 블록 구현
* **2.8 정규화 계층 고속화 (RMSNorm):** 평균 연산을 제거하여 7% 이상의 런타임 속도를 향상시키는 Root Mean Square Normalization 밑바닥 구현
* **2.9 Pre-LN Residual Highway:** Post-LN의 기울기 소실 극복 원리와 100층 이상 깊은 스택을 가능하게 하는 Pre-LN Transformer Block 조립
* **2.10 [미니 프로젝트]:** LLaMA 3 아키텍처 규격과 100% 호환되는 **디코더 전용(Decoder-only) 트랜스포머 모델** 밑바닥 완성

### 3단계: LLM 사전학습 & 자기회귀 생성 엔진 (Pre-training & Autoregressive Engine)

언어 모델의 인과적 마스킹 학습부터 고속 텍스트 생성을 위한 KV Cache 상태 관리, 메모리 샤딩 분산 학습을 구축합니다.

* **3.1 Causal Masking & Next-Token Loss:** 상삼각 마스킹($-\infty$ 마스크)을 통한 시점 차단, Shifted Logits와 Shifted Labels 기반의 CrossEntropy 계산
* **3.2 자기회귀(Autoregressive) 생성 파이프라인:** 이전 시점의 출력 토큰을 다음 입력으로 재귀 주입하는 텍스트 생성 루프와 종료 조건(`<EOS>`) 제어
* **3.3 KV Caching (Key-Value Cache):** 매 토큰 생성 시 이전 시점의 $K, V$ 텐서를 인메모리 버퍼에 누적 보존하여 시간 복잡도를 $O(N^2) \rightarrow O(N)$으로 최적화하는 엔진 구현
* **3.4 확률적 텍스트 디코딩 기법:** Greedy Decoding, Temperature Scaling(로짓 평탄화), Top-$K$ 필터링, Top-$P$(Nucleus) 누적 확률 샘플링 알고리즘 구현
* **3.5 고급 디코딩 페널티:** 중복 출력을 방지하는 Repetition Penalty, Presence/Frequency Penalty 및 롱테일 토큰을 차단하는 Min-$P$ 알고리즘
* **3.6 사전학습 데이터 파이프라인:** 대규모 코퍼스 토큰화, 고정 길이 패킹(Document Packing) 및 문서 간 오염을 막는 Cross-document Attention Masking
* **3.7 혼합 정밀도 학습 (Mixed Precision):** FP32, FP16, BF16 텐서 포맷 비교 및 Underflow 방지를 위한 Automatic Mixed Precision(AMP)과 `GradScaler` 구현
* **3.8 분산 데이터 병렬화 (DDP):** Data Parallelism의 Ring-AllReduce 통신 토폴로지 분석 및 그래디언트 동기화(Bucket AllReduce) 메커니즘
* **3.9 메모리 샤딩 분산 학습 (FSDP / ZeRO):** 모델 파라미터, 옵티마이저 상태, 그래디언트를 GPU 노드 간 샤딩하는 ZeRO (Stage 1/2/3) 원리 분석
* **3.10 [미니 프로젝트]:** 소형 도메인 코퍼스를 활용한 **100M급 경량 LLM 사전학습(Pre-training) 및 KV Cache 탑재 생성 엔진** 완성

### 4단계: 파라미터 효율적 튜닝(PEFT) & 모델 정렬 (Fine-Tuning & Alignment / RLHF / DPO)

사전 학습된 거대 파라미터를 저비용으로 미세조정하고, 인간의 의도와 안전성에 맞추어 정렬(Alignment)하는 기법을 마스터합니다.

* **4.1 지시 미세조정 (SFT) 데이터셋 구축:** ChatML / Alpaca 프롬프트 템플릿팅, System-User-Assistant 역할 구분 및 Prompt 토큰 Loss Masking(Label Masking) 구현
* **4.2 LoRA (Low-Rank Adaptation):** 가중치 갱신 행렬의 저순위 분해 $\Delta W = B \cdot A$ ($r \ll d$), Scaling Factor($\frac{\alpha}{r}$) 및 드롭아웃 레이어 구현
* **4.3 QLoRA (Quantized LoRA):** 4-bit NormalFloat(NF4) 양자화, 이중 양자화(Double Quantization), Paged Optimizer의 VRAM 절약 원리
* **4.4 가중치 분해 LoRA (DoRA):** 가중치를 방향(Direction)과 크기(Magnitude) 성분으로 분해하여 전체 파인튜닝 성능에 도달하는 DoRA 아키텍처 구현
* **4.5 선호도 데이터 모델링 & 보상 모델(RM):** Pairwise Chosen/Rejected 선호도 데이터셋 구축 및 Bradley-Terry 확률 모델 기반 Ranking Loss 구현
* **4.6 PPO 기반 RLHF:** Actor-Critic 아키텍처, Value Network, Reference Model과의 KL Divergence 페널티를 통한 정책 붕괴 방지 메커니즘
* **4.7 DPO (Direct Preference Optimization):** 보상 모델 학습 없이 닫힌 형태(Closed-form)의 손실 함수로 정책 모델을 직접 최적화하는 DPO 수학적 유도 및 구현
* **4.8 최신 정렬 기법 (ORPO & KTO):** Reference Model이 필요 없는 Odds Ratio Preference Optimization(ORPO) 및 인간 효용 이론 기반의 Kahneman-Tversky(KTO) 구현
* **4.9 정량적 평가 메트릭 & 벤치마크:** Perplexity(PPL), MMLU 스타일 다중선택 평가기, GSM8K 수학적 검증 로직 및 LLM-as-a-Judge 평가 파이프라인
* **4.10 [미니 프로젝트]:** 오픈소스 소형 LLM 대상 **LoRA SFT $\rightarrow$ DPO 정렬 파이프라인 구축 및 가중치 병합(Weight Merge)** 완성

### 5단계: LLM 시스템 최적화 & 고급 추론 엔지니어링 (Inference Systems & Advanced Reasoning)

운영 환경에서의 극단적인 메모리/속도 최적화 기법과 복합 다단계 추론(Reasoning) 아키텍처를 구축합니다.

* **5.1 사후 가중치 양자화 (PTQ):** RTN(Round-to-Nearest), 채널별 스케일링, AWQ(Activation-aware Weight Quantization) 및 GPTQ의 저비용 비트 패킹 원리
* **5.2 PagedAttention 메커니즘:** OS 가상 메모리 페이징 기법을 차용하여 KV Cache 메모리 단편화(Fragmentation)를 제거하는 물리적 블록 테이블 관리 구현
* **5.3 투기적 디코딩 (Speculative Decoding):** 소형 드래프트(Draft) 모델의 빠른 $K$개 토큰 생성과 대형 타깃 모델의 1회 병렬 검증을 통한 무손실(Lossless) 생성 가속기 구현
* **5.4 Continuous Batching & Chunked Prefill:** 요청 단위의 동적 슬롯 스케줄링과 Prefill-Decode 단계 분리를 통한 GPU 활용률 극대화
* **5.5 Prefix Caching & 시맨틱 캐싱:** 반복되는 공통 시스템 프롬프트의 KV Cache 해시 기반 재사용 메커니즘
* **5.6 문법 기반 제약 디코딩 (Structured Output):** EBNF 문법 및 JSON Schema 파서를 기반으로 유효하지 않은 토큰의 Logit을 마스킹하는 강제 정형 출력 엔진
* **5.7 임베딩 & 하이브리드 RAG 시스템:** Dense Vector + BM25 Sparse 검색 결합, Reciprocal Rank Fusion(RRF) 및 Cross-Encoder Re-ranking 파이프라인
* **5.8 다단계 사고 체계 (Reasoning / CoT):** Self-Consistency 다수결 투표, Tree-of-Thoughts(ToT) 탐색 및 단계별 정답을 검증하는 Process-supervised Reward Model(PRM)
* **5.9 기계론적 해석가능성 (Mechanistic Interpretability):** Residual Stream 내부 벡터 투영, 특정 문맥을 복제하는 Induction Heads 탐지, Sparse Autoencoder(SAE)를 통한 특징 추출
* **5.10 [통합 캡스톤 프로젝트]:** **Paged KV Cache 엔진 + LoRA/DPO 정렬 + JSON Grammar 디코더 + ReAct Reasoning 에이전트** 통합 시스템 구축
