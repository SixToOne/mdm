FROM openjdk:17-jdk
ARG JAR_FILE=build/libs/mdm-0.0.1-SNAPSHOT
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","app.jar"]
