package dev.kyeongbin.bookstore.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaController {
    @RequestMapping(value = {"/", "/{path:[^\\.]*}"})
    public String forward(){
        // ✅ "forward:/index.html" -> "forward:/dist/index.html" 로 수정
        return "forward:/index.html";
    }
}
