package com.ceawse.authservice.controller;

import com.ceawse.authservice.domain.entity.VendingMachine;
import com.ceawse.authservice.service.VendingMachineService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/v1/vending-machines")
@RequiredArgsConstructor
@CrossOrigin("*")
public class VendingMachineController {
    private final VendingMachineService service;

    @GetMapping
    public List<VendingMachine> getAll(@RequestParam(required = false) String name) {
        return service.findAll(name);
    }

    // Тот самый эндпоинт для "Монитора ТА"
    @GetMapping("/monitor")
    public List<Map<String, Object>> getMonitor() {
        return service.findAll(null).stream()
                .map(service::getMachineMonitoringData)
                .toList();
    }

    @PostMapping
    public VendingMachine create(@RequestBody VendingMachine vm) {
        return service.save(vm);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}