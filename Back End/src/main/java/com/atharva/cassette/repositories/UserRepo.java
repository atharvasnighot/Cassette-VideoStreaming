package com.atharva.cassette.repositories;

import com.atharva.cassette.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<Users, String> {

    public Optional<Users> findByUsername(String username);
    public Optional<Users> findByEmail(String email);
    boolean existsByUsername(String username);
}
