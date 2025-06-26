package com.example.demo.controller;

import com.example.demo.model.Mechanic;
import com.example.demo.service.MechanicService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MechanicsController {

    private final MechanicService mechanicService;

    @Autowired
    public MechanicsController(MechanicService mechanicService) {
        this.mechanicService = mechanicService;
    }

    @GetMapping("/mechanics")
    public ResponseEntity<List<Mechanic>> getAllMechanics() {
        return ResponseEntity.ok(mechanicService.findAll());
    }

    @GetMapping("/mechanics/{id}")
    public ResponseEntity<Object> getOneMechanic(@PathVariable long id) {
        if (!mechanicService.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Mechanic not found");
        }
        return ResponseEntity.ok(mechanicService.findById(id).get());
    }

    @PostMapping("/mechanics")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<Mechanic> createMechanic(@Valid @RequestBody Mechanic mechanic) {

        return ResponseEntity.status(HttpStatus.CREATED).body(mechanicService.save(mechanic));
    }

    @PutMapping("/mechanics/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<Object> updateMechanic(@PathVariable long id, @Valid @RequestBody Mechanic mechanic) {
        if (!mechanicService.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Mechanic not found");
        }
        Mechanic mechanicFromDB = mechanicService.findById(id).get();
        mechanicFromDB.setExperienceYears(mechanic.getExperienceYears());
        mechanicFromDB.setFullName(mechanic.getFullName());
        return ResponseEntity.status(HttpStatus.CREATED).body(mechanicService.save(mechanicFromDB));
    }

    @DeleteMapping("/mechanics/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<Object> deleteMechanic(@PathVariable long id) {
        if (!mechanicService.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Mechanic not found");
        }
        mechanicService.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
