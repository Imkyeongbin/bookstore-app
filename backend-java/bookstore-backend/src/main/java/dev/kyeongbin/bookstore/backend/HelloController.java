package dev.kyeongbin.bookstore.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController // 이 클래스가 웹 요청을 처리하는 컨트롤러임을 나타냅니다.
public class HelloController {

    @GetMapping("/") // HTTP GET 요청이 "/" 경로로 올 때 이 메서드를 실행합니다.
    public String hello() {
        return "Hello, Bookstore Backend!";
    }
}