package com.example.demo.service;

import com.example.demo.model.Mechanic;
import com.example.demo.repository.MechanicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MechanicService {

    private final MechanicRepository mechanicRepository;

    @Autowired
    public MechanicService(MechanicRepository mechanicRepository) {
        this.mechanicRepository = mechanicRepository;
    }

    public List<Mechanic> findAll() {
        return mechanicRepository.findAll();
    }

    public boolean existsById(long id) {
        return mechanicRepository.existsById(id);
    }

    public Mechanic save(Mechanic mechanic) {
        return mechanicRepository.save(mechanic);
    }

    public Optional<Mechanic> findById(long id) {
        return mechanicRepository.findById(id);
    }

    public void deleteById(long id) {
        mechanicRepository.deleteById(id);
    }
}
