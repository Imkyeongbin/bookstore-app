package dev.kyeongbin.bookstore.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity // JPA 엔티티 클래스임을 나타냄
@Data   // Getter, Setter, toString, equals, hashCode 자동 생성
@NoArgsConstructor // 파라미터 없는 기본 생성자 자동 생성
@AllArgsConstructor // 모든 필드를 파라미터로 받는 생성자 자동 생성
public class Book {

    @Id // 기본 키
    @GeneratedValue(strategy = GenerationType.IDENTITY) // DB가 ID를 자동 생성
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, length = 100)
    private String author;

    @Column
    private Integer quantity;
}