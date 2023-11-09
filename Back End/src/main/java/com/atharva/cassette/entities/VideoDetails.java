package com.atharva.cassette.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "video_table")
public class VideoDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer videoId;

    @Column(unique = true)
    private String videoName;

    private String description;
    private String uploader;
    private Date uploadDate;
    private int likeCount;
    private int dislikeCount;

}
