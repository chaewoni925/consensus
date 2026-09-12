# 1단계: Gradle 빌드 단계
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app
COPY . .
RUN chmod +x ./gradlew
RUN ./gradlew bootJar -x test --no-daemon

# 2단계: 실행 단계
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/build/libs/*[!plain].jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
