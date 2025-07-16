package dev.kyeongbin.bookstore.backend.dto;
import dev.kyeongbin.bookstore.backend.model.Book;
import lombok.Data;
import java.util.List;

@Data
public class BookResponseDto {
    private List<Book> books;
    private long total;
    private int page;
    private int pages;
}