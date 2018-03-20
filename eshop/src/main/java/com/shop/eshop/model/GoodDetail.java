package com.shop.eshop.model;

public class GoodDetail {
    private Integer id;

    private String productIdentifier;

    private String factoryName;

    private String factoryAddress;

    private String factoryPhone;

    private Integer qualityData;

    private Integer additive;

    private String weight;

    private String brand;

    private String productPlace;

    private Boolean sweets;

    private String packType;

    private String barCode;

    private Integer goodId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getProductIdentifier() {
        return productIdentifier;
    }

    public void setProductIdentifier(String productIdentifier) {
        this.productIdentifier = productIdentifier == null ? null : productIdentifier.trim();
    }

    public String getFactoryName() {
        return factoryName;
    }

    public void setFactoryName(String factoryName) {
        this.factoryName = factoryName == null ? null : factoryName.trim();
    }

    public String getFactoryAddress() {
        return factoryAddress;
    }

    public void setFactoryAddress(String factoryAddress) {
        this.factoryAddress = factoryAddress == null ? null : factoryAddress.trim();
    }

    public String getFactoryPhone() {
        return factoryPhone;
    }

    public void setFactoryPhone(String factoryPhone) {
        this.factoryPhone = factoryPhone == null ? null : factoryPhone.trim();
    }

    public Integer getQualityData() {
        return qualityData;
    }

    public void setQualityData(Integer qualityData) {
        this.qualityData = qualityData;
    }

    public Integer getAdditive() {
        return additive;
    }

    public void setAdditive(Integer additive) {
        this.additive = additive;
    }

    public String getWeight() {
        return weight;
    }

    public void setWeight(String weight) {
        this.weight = weight == null ? null : weight.trim();
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand == null ? null : brand.trim();
    }

    public String getProductPlace() {
        return productPlace;
    }

    public void setProductPlace(String productPlace) {
        this.productPlace = productPlace == null ? null : productPlace.trim();
    }

    public Boolean getSweets() {
        return sweets;
    }

    public void setSweets(Boolean sweets) {
        this.sweets = sweets;
    }

    public String getPackType() {
        return packType;
    }

    public void setPackType(String packType) {
        this.packType = packType == null ? null : packType.trim();
    }

    public String getBarCode() {
        return barCode;
    }

    public void setBarCode(String barCode) {
        this.barCode = barCode == null ? null : barCode.trim();
    }

    public Integer getGoodId() {
        return goodId;
    }

    public void setGoodId(Integer goodId) {
        this.goodId = goodId;
    }
}