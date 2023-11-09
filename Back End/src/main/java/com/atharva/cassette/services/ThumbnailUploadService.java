package com.atharva.cassette.services;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class ThumbnailUploadService {

    private final String FOLDER_PATH = "B:\\SpringBoot\\Cassette-VideoStreaming\\Back End\\src\\main\\resources\\static\\thumbnails\\";

    public String uploadAndCompressImage(MultipartFile file, String title) throws IOException {
        String compressedFilePath = FOLDER_PATH + title;

        Thumbnails.of(file.getInputStream())
                .size(640, 480)
                .outputFormat("jpg")
                .outputQuality(0.9)
                .toFile(new File(compressedFilePath));

        return "File uploaded and compressed successfully: " + compressedFilePath;
    }
}
