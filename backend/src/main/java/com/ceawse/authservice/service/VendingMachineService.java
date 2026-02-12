package com.ceawse.authservice.service;

import com.ceawse.authservice.domain.entity.VendingMachine;
import com.ceawse.authservice.repository.VendingMachineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
@RequiredArgsConstructor
public class VendingMachineService {
    private final VendingMachineRepository repository;

    public List<VendingMachine> findAll(String name) {
        if (name != null) return repository.findByNameContainingIgnoreCase(name);
        return repository.findAll();
    }

    // Эмуляция данных мониторинга (чтобы не хранить в БД лишнее)
    public Map<String, Object> getMachineMonitoringData(VendingMachine vm) {
        Map<String, Object> data = new HashMap<>();
        Random r = new Random();
        data.put("id", vm.getId());
        data.put("name", vm.getName());
        data.put("status", vm.getStatus());
        data.put("signal", 50 + r.nextInt(50)); // 50-100%
        data.put("cash", 1000 + r.nextInt(5000)); // Случайные деньги
        data.put("stock", 20 + r.nextInt(80)); // Загрузка товаром
        data.put("nextMaintenance", vm.getLastCheckDate() != null ?
                vm.getLastCheckDate().plusMonths(vm.getCheckInterval()) : "Не задано");
        return data;
    }

    public VendingMachine save(VendingMachine vm) {
        return repository.save(vm);
    }

    // НОВЫЙ МЕТОД: Сохранение списка
    public void saveAll(List<VendingMachine> machines) {
        repository.saveAll(machines);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}